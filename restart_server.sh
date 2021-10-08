#!/bin/bash

remote_host=ubuntu@18.219.12.230
# shellcheck disable=SC2088
remote_path='~/hack/'
project_directory=$(pwd)
if [ ! -f "${project_directory}/manage.py" ]
then
  echo 'You are not in dashboard root directory!'
fi

files_to_exclude=('venv' '.git' '.idea' '.env' '__pycache__' 'dev_settings.py' '.gitignore' '.dockerignore')
excludes=''
for i in "${!files_to_exclude[@]}";
do
  # shellcheck disable=SC2089
  excludes+=" --exclude='${files_to_exclude[$i]}'"
done

comm="rsync -i ~/Documents/aws.cer -a --progress ${excludes} ${project_directory}/* ${remote_host}:${remote_path}"
echo "$comm"
eval $comm
