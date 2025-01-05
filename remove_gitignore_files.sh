#!/bin/bash

# Read the .gitignore file and get the list of ignored files
ignored_files=$(grep -v '^#' .gitignore | grep -v '^$')
echo $ignored_files
# Iterate over the ignored files and remove them from Git
while IFS= read -r file; do
    # Check if the file exists before trying to remove it
    if [ -e "$file" ]; then
        git rm --cached "$file"
    else
        echo "Skipping $file: File not found"
    fi
done <<< "$ignored_files"
