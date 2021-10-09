from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger

from core.services.datahub_api.data_getter import DataHubDataGetter
from vtb_hack import settings


def get_data_and_parse():
    print(12323123123123)
    DataHubDataGetter().parse_data()


DEFAULT_JOB_PARAMS = {
    'max_instances': 1,
    'replace_existing': True,
}

JOBS_TO_RUN = [
    {
        'func': get_data_and_parse,
        'trigger': CronTrigger(minute='5'),
    },
]


def get_job_params(job: dict):
    job_params = dict(DEFAULT_JOB_PARAMS, id=job['func'].__name__)
    job_params.update(job)
    return job_params


def run_appscheduler():
    scheduler = BackgroundScheduler(timezone=settings.TIME_ZONE)
    for job in JOBS_TO_RUN:
        scheduler.add_job(**get_job_params(job))
    scheduler.start()
