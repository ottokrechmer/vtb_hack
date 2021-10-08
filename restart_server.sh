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

#ssh ${remote_host} <<'EOF'
#  kill $(ps aux | grep '[r]unserver' | awk '{print $2}') && echo 'process killed' || echo 'process is not killed'
#  cd 'python-dashboard' &&
#  source venv/bin/activate &&
#  export FIRST_BUILD=True &&
#  python manage.py migrate &&
#  export FIRST_BUILD=False &&
#  nohup python -u manage.py runserver --noreload 127.0.0.1:8333 &> nohup.out &&
#  exit
#EOF

#ssh ${remote_host} <<'EOF'
#  cd 'python-dashboard' &&
#  cat last_deploy.log >> .deploy_history &&
#  source venv/bin/activate &&
#  export FIRST_BUILD=True &&
#  python manage.py migrate &&
#  export FIRST_BUILD=False &&
#  sudo systemctl restart dashboar.service
#  exit
#EOF
