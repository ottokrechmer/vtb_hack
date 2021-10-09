FROM python:3.9.5-slim

WORKDIR /opt/app

ENV DJANGO_SETTINGS_MODULE=vtb_hack.settings
COPY requirements.txt .

RUN apt-get update && apt-get install -y libpq-dev \
   && pip config set global.trusted-host 'files.pythonhosted.org pypi.org' &&  pip install -r requirements.txt

COPY . .

ENTRYPOINT sleep 10 && \
	export FIRST_BUILD=true && \
	python manage.py migrate && \
	python deploy_script.py && \
#	python pre_tests.py && \
	export FIRST_BUILD=false && \
	python manage.py runserver --noreload 0.0.0.0:8000
