import { getApiInstance } from "./_api";
import {StatusCodes} from "http-status-codes";
import DatasetModel from "../models/dataset";

export const fetchDataset = async (id) => {
	const apiService = getApiInstance();
	const response = await apiService.get('datasets/' + id + '/', {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token') || ''}`
		}
	});
	if (response.data && response.status === StatusCodes.OK) {
		return DatasetModel.sourceFromApi(response.data, id);
	}
};

export const fetchSchema = async(id) => {
	const apiService = getApiInstance();
	const response = await apiService.get('schemas/' + id + '/', {
		headers: {
			'Authorization': `Token ${localStorage.getItem('token') || ''}`
		}
	});
	if (response.data && response.status === StatusCodes.OK) {
		return response.data.json_field;
	}
}

export const getDataSets = async (params) => {
  const apiService = getApiInstance();
  const config = (params.search || params.is_mine || params.is_purchased) ? { headers: {
      'Authorization': `Token ${localStorage.getItem('token') || ''}`
    }} : undefined;

  try {
    const res = await apiService.get(`datasets?name=${params.name || ''}&is_mine=${params.is_mine || ''}&is_purchased=${params.is_purchased || ''}`,config );
 if( res.status === StatusCodes.UNAUTHORIZED) {
   localStorage.removeItem('token');
 }
    if (res?.data?.results)
      return res.data.results;
		return null;
  }
  catch (error) {
    console.log(error);
    return null;
  }
}

export const purchaseDataset = async (id) => {
	const apiService = getApiInstance();
	const response = await apiService.post('datasets/' + id + '/purchase/', '', { headers: {
    'Authorization': `Token ${localStorage.getItem('token') || ''}`
  }});
	if (response.data && response.status === StatusCodes.OK) {
		return response.data;
	}
  return false;
};

export const createMetadata = async (data) => {
	const apiService = getApiInstance();
	const response = await apiService.post('metadata/', DatasetModel.metadataToApi(data), { headers: {
    'Authorization': `Token ${localStorage.getItem('token') || ''}`
  }});
	if (response.data && response.status === StatusCodes.OK) {
		return response.data;
	}
  return false;
};

export const createDataset = async (data) => {
	const apiService = getApiInstance();
	const response = await apiService.post('datasets/', data, {
    headers: { 'Authorization': `Token ${localStorage.getItem('token') || ''}`},
  });
	if (response.data && response.status === StatusCodes.CREATED) {
    console.log(data.fields);
    if (data.fields) {
      data.fields.map((item) => createMetadata({ ...item, data_set: response.data.id }));
    }
		return response.data;
	}
  return false;
};

export const fetchDataTypes = async () => {
	const apiService = getApiInstance();
	const response = await apiService.get('datatypes/', '', { headers: {
    'Authorization': `Token ${localStorage.getItem('token') || ''}`
  }});
	if (response.data && response.status === StatusCodes.OK) {
		return response.data;
	}
  return false;
};
export const fetchPostFeature = async (rawData) => {
	const apiService = getApiInstance();
	const payload = DatasetModel.featureToApi(rawData);
	const json = JSON.stringify(payload);
	const response = await apiService.post('schemas/', json, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Token ${localStorage.getItem('token') || ''}`
		}
	});
	if(response.data && response.status === StatusCodes.OK) {
		return true;
	}
	return false;
}

export const getFeature = async () => {
  const apiService = getApiInstance();
  try {
    const response = await apiService.get('schemas/', {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token') || ''}`
      }
    });
    if (response.status === StatusCodes.UNAUTHORIZED) {
      localStorage.removeItem('token');
    }
    if (response?.data?.results)
      return response.data.results;
    return null;
  }
  catch (error){
    console.log(error);
  }
}

export const updateDataset = async (data) => {
  data.owner= {};
  const apiService = getApiInstance();
  const config = { headers: {
      'Authorization': `Token ${localStorage.getItem('token') || ''}`
    }};
  try {
    const res = await apiService.put('datasets/' + data.id + '/', data, config);
    if( res.status === StatusCodes.UNAUTHORIZED) {
      localStorage.removeItem('token');
    }
    return true;
  }
  catch (error) {
    console.log(error);
    return false;
  }
};
