import logging
import os


DEBUG = os.getenv('DEBUG', False) in ('true', 'True')

logging.basicConfig(
    format='%(asctime)s %(levelname)-8s %(module)s %(message)s',
    level=os.getenv('LOG_LEVEL', 'INFO'),
    datefmt='%Y-%m-%d %H:%M:%S'
)


def os_getenv(key, default=None):
    """Get an environment variable, return None if it doesn't exist or empty.
    The optional second argument can specify an alternate default.
    key, default and the result are str."""

    value = os.getenv(key, default)
    if value == '':
        logging.warning(f'ENV variable: {key} is set to empty string. Using default value instead ({default=})')
        value = default
    if DEBUG:
        logging.info(f'ENV: {key}="{value}"')
    return value
