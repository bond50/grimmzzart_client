export function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}


export const extractAddress = (place) => {
    const address = {
        city: "",
        state: "",
        region: "",
        county: "",
        lat: '',
        formattedAddress: "",
        googlePlaceId: "",
        lng: '',
        zipCode: "",
        country: "",
        name: '',
        plain() {
            const city = this.city ? this.city + ", " : "";
            const zipCode = this.zipCode ? this.zipCode + ", " : "";
            const state = this.state ? this.state + ", " : "";
            return city + zipCode + state + this.country;
        },
    };

    console.log('PLACE',place)
    if (!Array.isArray(place?.address_components)) {
        return address;
    }

    if (place?.geometry) {
        if (typeof place.geometry.location.lat === 'number' && typeof place.geometry.location.lng === 'number') {
            address.lat = place.geometry.location.lat;
            address.lng = place.geometry.location.lng;
        } else {
            address.lat = place.geometry.location.lat();
            address.lng = place.geometry.location.lng();
        }
    }
    if (place?.place_id) {
        address.googlePlaceId = place.place_id;
    }
    if (place.name) {
        address.name = place.name;
    }
    if (place.formatted_address) {
        address.formattedAddress = place.formatted_address;
    }



    place.address_components.forEach(component => {
        const types = component.types;
        const value = component.long_name;

        if (types.includes("locality")) {
            address.city = value;
        }
        if (types.includes("administrative_area_level_1")) {
            address.state = value;
        }
        if (types.includes("administrative_area_level_2")) {
            address.region = value;
        }
        if (types.includes("postal_code")) {
            address.zipCode = value;
        }
        if (types.includes("country")) {
            address.country = value;
        }
    });



    return address;
};




