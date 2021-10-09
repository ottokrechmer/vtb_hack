import os

from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'

    if os.environ.get('FIRST_BUILD', False) not in ('true', 'True'):
        def ready(self):
            from django.conf import settings
            if settings.START_SCHEDULER:
                from core.services.scheduler.scheduler_manager import run_appscheduler
                run_appscheduler()
