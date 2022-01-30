#!/bin/bash

while true
do
    now=$(date +"%T")
    echo $now": Pinging server www.bootcampcoder.com"
    curl -v www.bootcampcoder.com
    random=$(shuf -i 1080-1560 -n 1)
    echo ""
    echo $now": Sleeping for $random seconds"
    sleep $random
done