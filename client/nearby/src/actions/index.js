export const getNearbyWorkspaces = async () => {
    const splitUrl = window.location.pathname.split('/').filter((el) => el);
    const id = splitUrl[splitUrl.length - 1];
    const res = await axios.get(`/api/nearbyworkspaces/buildings/${id}`);
    return res.data;
};
