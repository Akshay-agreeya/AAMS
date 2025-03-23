import React, { useCallback, useEffect, useState } from 'react';
import { Select } from '../input/Select';
import { City } from 'country-state-city';


export const CitySelect = ({ countryId, stateId, name = "city", onChange,value, ...rest }) => {

    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(value);

     useEffect(() => {
            setSelectedCity(value);
        }, [value,cities]);

    const getCities = useCallback(() => {
        try {
            const resp = City.getCitiesOfState(countryId,stateId)?.map(item => ({ label: item.name, value: item.name })) || [];
            resp.splice(0, 0, { value: "", label: "Select City", props: { defaultValue: '', disabled: true } });
            setCities(resp);
            setSelectedCity('');
        }
        catch (error) {
            console.log(error);
            setCities([]);
        }
    }, [countryId,stateId]);

    useEffect(() => {
        getCities();
    }, [getCities]);


    const handleCityChange = (e) => {
        setSelectedCity(e.target.value);
        if (onChange)
            onChange(e);
    };

    return (
        <Select options={cities} name={name} onChange={handleCityChange} {...rest} value={selectedCity}/>
    )
}