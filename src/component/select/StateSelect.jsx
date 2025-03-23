import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Select } from '../input/Select';
import { State } from 'country-state-city';


export const StateSelect = forwardRef(({ countryId, name = "state", onChange, value, ...rest }, ref) => {

    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(value);

    useEffect(() => {
        setSelectedState(value);
    }, [value,states]);

    const getStates = useCallback(() => {
        try {
            const resp = State.getStatesOfCountry(countryId)?.map(item => ({ label: item.name, value: item.name, item })) || [];
            resp.splice(0, 0, { value: "", label: "Select State", props: { defaultValue: '', disabled: true } });
            setStates(resp);
            setSelectedState('');
        }
        catch (error) {
            console.log(error);
        }
    }, [countryId]);

    useEffect(() => {
        getStates();
    }, [getStates]);

    useImperativeHandle(ref, () => ({
        getISOCode(state) {
            return states?.find(item => item.value === state)?.item?.isoCode || '';
        }
    }))


    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        if (onChange)
            onChange(e);
    };

    return (
        <Select options={states} name={name} onChange={handleStateChange} {...rest} value={selectedState} />
    )
});