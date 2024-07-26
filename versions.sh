#!/bin/bash

versions=""
temp_file=$(mktemp)

while IFS= read -r line; do
    if [[ "$line" == "## "* ]]; then
        continue
    fi

    if [[ "$line" == "### "* ]]; then
        modified_string=$(echo "$line" | sed 's/### //')
        versions+="        - $modified_string"$'\n'
    fi
done < HISTORY.md

echo $versions

temp_file=$(mktemp)

while IFS= read -r line; do
    if [[ "$line" == "        - 最新" ]]; then
        echo "$versions" >> "$temp_file"
    else
        echo "$line" >> "$temp_file"
    fi
done < ./bug.template

mv "$temp_file" .github/ISSUE_TEMPLATE/bug.yml
