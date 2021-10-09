import json

from core.models import MetaData, DataSet
from core.services.datahub_api.api_call import data_getter
from core.services.mappers.data_type_mapper import DATA_TYPE_MAPPER
from core.services.mappers.datahub_query import dt_query
from vtb_hack.settings import DATAHUB_LOGIN, DATAHUB_PASSWORD


class DataHubDataGetter:

    def __init__(self):
        self.dh_url = 'http://datahub.yc.pbd.ai:9002'
        self.cookies = None
        self.raw_data = None

    def _set_cookies(self):
        url = self.dh_url + '/logIn'
        body = {'username': DATAHUB_LOGIN, 'password': DATAHUB_PASSWORD}
        print('cookies')
        return data_getter(url, body)

    def _get_ds_and_md(self):
        url = self.dh_url + '/api/graphql/'
        body = {'query': dt_query}
        print('data')
        return json.loads(data_getter(url, body, self.cookies))

    def parse_data(self):
        self.cookies = self._set_cookies()
        self.raw_data = self._get_ds_and_md()

        data_sets = list(DataSet.objects.all())
        meta_data = list(MetaData.objects.all())

        ds_dict = {ds.urn: ds for ds in data_sets}
        md_dict = {md.field_name: md for md in meta_data}

        new_dss = []
        new_mds = []
        if raw_list := self.raw_data.get('data').get('search').get('searchResults'):
            for new_ds in raw_list:
                if new_ds.get('entity').get('urn') not in ds_dict:
                    new_dss.append(DataSet(
                        urn=new_ds.get('entity').get('urn'),
                        name=new_ds.get('entity').get('name'),
                        description=new_ds.get('entity').get('description'),
                    ))
            data_sets += list(DataSet.objects.bulk_create(new_dss))
            ds_dict = {ds.urn: ds for ds in data_sets}
            for ds in raw_list:
                for new_md in ds.get('entity').get('schema').get('fields'):
                    if new_md.get('fieldPath') not in md_dict:
                        if new_md.get('type') in DATA_TYPE_MAPPER:
                            new_mds.append(MetaData(
                                field_name=new_md.get('fieldPath'),
                                description=new_md.get('description'),
                                data_type=DATA_TYPE_MAPPER[new_md.get('type')],
                                data_set=ds_dict[ds.get('entity').get('urn')]
                            ))
            MetaData.objects.bulk_create(new_mds)
            print('parsed!')
