import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Select } from '../input/Select';
import { Country } from 'country-state-city';

// const countries = [
//     { value: '', label: "Select Country", props: { defaultValue:'', disabled: true } },
//     { value: "United States", label: "United States" },
//     { value: "India", label: "India" },
//     { value: "Japan", label: "Japan" }
// ];

export const CountrySelect = forwardRef(({ name = "country", ...rest }, ref) => {

    const [countries, setCountries] = useState([]);

    const getCountries = useCallback(() => {
        try {
            const resp = Country.getAllCountries()?.map(item => ({ label: item.name, value: item.name, item }));
            resp.splice(0, 0, { value: "", label: "Select Country", props: { defaultValue: '', disabled: true } });
            setCountries(resp);
        }
        catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getCountries();
    }, [getCountries]);


    useImperativeHandle(ref, () => ({
        getISOCode(country) {
            return countries?.find(item => item.value === country)?.item?.isoCode || '';
        }
    }))

    return (
        <Select options={countries} name={name} {...rest} />
    )
})