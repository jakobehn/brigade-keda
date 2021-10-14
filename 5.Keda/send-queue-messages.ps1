#Connect-AzAccount
Set-AzContext -Subscription "b7b2c6f7-b71e-4cd2-9e7c-409a44fe22f5"

$storageAccountName = "kedademo123"
$storageAccount = Get-AzStorageAccount  -ResourceGroupName "kedademo" -Name $storageAccountName
$ctx = $storageAccount.Context


$queue = Get-AzStorageQueue –Name $queueName –Context $ctx

for ($i = 0; $i -lt 200; $i++) {
    $queueMessage = [Microsoft.Azure.Storage.Queue.CloudQueueMessage]::new("This is message $i")    
    $sentMessage = $queue.CloudQueue.AddMessageAsync($QueueMessage)
}