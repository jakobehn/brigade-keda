brig build delete-all jakob/pr
brig build delete-all jakob/brigadedemo
brig build delete-all jakobehn/brigadeapp

k delete pod --field-selector=status.phase==Succeeded
k delete pod --field-selector=status.phase==Failed