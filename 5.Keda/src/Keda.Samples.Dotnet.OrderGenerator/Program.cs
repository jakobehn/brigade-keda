﻿using Azure.Messaging.ServiceBus;
using Bogus;
using Keda.Samples.Dotnet.Contracts;
using Newtonsoft.Json;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Keda.Samples.Dotnet.OrderGenerator
{
    class Program
    {
        private const string ConnectionString = "Endpoint=sb://kedademo123.servicebus.windows.net/;SharedAccessKeyName=order-sender;SharedAccessKey=RxzXDP2yB7HBTk3iNxnAXPtGAMgT/SuiRC72U2ykorw=;EntityPath=orders";
        
        static async Task Main(string[] args)
        {
            Console.WriteLine("Let's queue some orders, how many do you want?");
            var requestedAmount = DetermineOrderAmount();
            await QueueOrders(requestedAmount);

            Console.WriteLine("That's it, see you later!");
        }

        private static async Task QueueOrders(int requestedAmount)
        {
            //var serviceBusConnectionStringBuilder = new ServiceBusConnectionStringBuilder(ConnectionString);

            var queueClient = new ServiceBusClient(ConnectionString);
            var sender = queueClient.CreateSender("orders");

            for (int currentOrderAmount = 0; currentOrderAmount < requestedAmount; currentOrderAmount++)
            {
                var order = GenerateOrder();
                var rawOrder = JsonConvert.SerializeObject(order);
                var orderMessage = new ServiceBusMessage(Encoding.UTF8.GetBytes(rawOrder));

                Console.WriteLine($"Queuing order {order.Id} - A {order.ArticleNumber} for {order.Customer.FirstName} {order.Customer.LastName}");
                await sender.SendMessageAsync(orderMessage);
            }
        }

        private static Order GenerateOrder()
        {
            var customerGenerator = new Faker<Customer>()
                .RuleFor(u => u.FirstName, (f, u) => f.Name.FirstName())
                .RuleFor(u => u.LastName, (f, u) => f.Name.LastName());

            var orderGenerator = new Faker<Order>()
                .RuleFor(u => u.Customer, () => customerGenerator)
                .RuleFor(u => u.Id, f => Guid.NewGuid().ToString())
                .RuleFor(u => u.Amount, f => f.Random.Int())
                .RuleFor(u => u.ArticleNumber, f => f.Commerce.Product());

            return orderGenerator.Generate();
        }

        private static int DetermineOrderAmount()
        {
            var rawAmount = Console.ReadLine();
            if (int.TryParse(rawAmount, out int amount))
            {
                return amount;
            }

            Console.WriteLine("That's not a valid amount, let's try that again");
            return DetermineOrderAmount();
        }
    }
}
