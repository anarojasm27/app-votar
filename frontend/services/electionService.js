import api from '@/lib/axios';

export const getElections = async (status = null) => {
    const url = status ? `/elections/?status=${status}` : '/elections/';
    const response = await api.get(url);
    return response.data;
};

export const getElectionDetail = async (id) => {
    const response = await api.get(`/elections/${id}/`);
    return response.data;
};

export const getCandidates = async (electionId = null) => {
    const url = electionId ? `/candidates/?election=${electionId}` : '/candidates/';
    const response = await api.get(url);
    return response.data;
};
