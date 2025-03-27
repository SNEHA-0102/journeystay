declare const Autocomplete: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly q: {
                    readonly type: "string";
                    readonly examples: readonly ["Empire State Building"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Free-form query string to search for. Commas are optional, but improves performance by reducing the complexity of the search.";
                };
                readonly countrycodes: {
                    readonly type: "string";
                    readonly examples: readonly ["us,ca,gb"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s).";
                };
                readonly tag: {
                    readonly type: "string";
                    readonly examples: readonly ["place:city"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Restricts results to specific types of elements. This can be used to return only administrative areas - such as towns or cities - or specific Points of Interest such as schools or restaurants. \nThis is defined as key value pairs of `class` and `type` values based on OpenStreetMap''s (OSM) <a href=\"https://wiki.openstreetmap.org/wiki/Map_Features\" target=\"_blank\">exhaustive list</a>. \nMultiple `class` and `type` values can be specified as a comma-separated list.<br/><br/>\nExamples:<ul><li>To return only cities: `tag=place:city`</li><li>To return only types of `place`, such as Suburbs, Towns and Cities, use a wildcard: `tag=place:*`</li><li>To restrict results to specific types of `place`: `tag=place:city,place:town,place:village`</li><li>To restrict results to cafes: `tag=amenity:cafe`</ul> '";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 20;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of returned results. Accepted value: `1` to `20`. Defaults to `10`.";
                };
                readonly viewbox: {
                    readonly type: "string";
                    readonly examples: readonly ["-73.9965012,40.7489255,-73.9858166,40.7499585"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The preferred area to find search results. Any two corner points of the box - `max_lon,max_lat,min_lon,min_lat` or `min_lon,min_lat,max_lon,max_lat` - are accepted in any order as long as they span a real box. To restrict results to those within the viewbox, use along with the `bounded` option.";
                };
                readonly bounded: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Restrict result to items contained within the bounds specified in the `viewbox` parameter. Defaults to `0`.";
                };
                readonly json_callback: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats.";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly importancesort: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Determines whether results are sorted by their individual `importance` values. If `importancesort=0` and is used along with the `viewbox` parameter, results are sorted only by distance. Defaults to `1`.";
                };
                readonly dedupe: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `0`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested.";
                };
            };
            readonly required: readonly ["q"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-autocomplete";
            readonly "x-stoplight": {
                readonly id: "05c483aae353e";
            };
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly place_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the place.";
                    };
                    readonly osm_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the OpenStreetMap object.";
                    };
                    readonly osm_type: {
                        readonly type: "string";
                        readonly description: "Type of OpenStreetMap object.";
                    };
                    readonly licence: {
                        readonly type: "string";
                        readonly description: "License information for the data.";
                    };
                    readonly lat: {
                        readonly type: "string";
                        readonly description: "Latitude of the location.";
                    };
                    readonly lon: {
                        readonly type: "string";
                        readonly description: "Longitude of the location.";
                    };
                    readonly boundingbox: {
                        readonly type: "array";
                        readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly class: {
                        readonly type: "string";
                        readonly description: "The category of this result";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The 'type' of the class/category of this result";
                    };
                    readonly display_name: {
                        readonly type: "string";
                        readonly description: "Formatted address for display.";
                    };
                    readonly display_place: {
                        readonly type: "string";
                        readonly description: "Only the name part of the address; if the `type` is a `city`, just the city's name. If the `type` is `highway`, just the road's name. This is helpful when a client library wants to display this information separately.";
                    };
                    readonly display_address: {
                        readonly type: "string";
                        readonly description: "The complete address without the text already present in `display_place`.";
                    };
                    readonly address: {
                        readonly title: "address-autocomplete";
                        readonly "x-stoplight": {
                            readonly id: "ne9kgzxgg54ig";
                        };
                        readonly type: "object";
                        readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly house_number: "350";
                                readonly road: "5th Avenue";
                                readonly neighbourhood: "Manhattan Community Board 5";
                                readonly suburb: "Manhattan";
                                readonly city: "New York";
                                readonly county: "New York County";
                                readonly state: "New York";
                                readonly postcode: "10001";
                                readonly country: "United States of America";
                                readonly country_code: "us";
                            };
                            readonly "Result from Ocean": {
                                readonly name: "South Pacific Ocean";
                            };
                            readonly "Example 2": {
                                readonly name: "South Pacific Ocean";
                            };
                        };
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "House name or Point of Interest (POI)";
                            };
                            readonly house_number: {
                                readonly type: "string";
                                readonly description: "House or Building number";
                                readonly examples: readonly ["3894"];
                            };
                            readonly road: {
                                readonly type: "string";
                                readonly description: "Roads, Highways, Freeways, Motorways";
                                readonly examples: readonly ["Spring Mill Way"];
                            };
                            readonly neighbourhood: {
                                readonly type: "string";
                                readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                            };
                            readonly suburb: {
                                readonly type: "string";
                                readonly description: "Suburbs, Subdivisions";
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                readonly examples: readonly ["Landen"];
                            };
                            readonly county: {
                                readonly type: "string";
                                readonly description: "Counties";
                                readonly examples: readonly ["Warren County"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly description: "States, Provinces, Regions, State Districts";
                                readonly examples: readonly ["Ohio"];
                            };
                            readonly state_code: {
                                readonly type: "string";
                                readonly description: "State or Province Code";
                                readonly examples: readonly ["oh"];
                            };
                            readonly postcode: {
                                readonly type: "string";
                                readonly description: "Postal Codes, Zipcodes";
                                readonly examples: readonly ["45039"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly description: "Countries, Nation-states";
                                readonly examples: readonly ["United States of America"];
                            };
                            readonly country_code: {
                                readonly type: "string";
                                readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                readonly examples: readonly ["us"];
                            };
                        };
                    };
                };
            };
            readonly "x-examples": {
                readonly "Example 1": readonly [{
                    readonly place_id: "322123240136";
                    readonly osm_id: "34633854";
                    readonly osm_type: "way";
                    readonly licence: "https://locationiq.com/attribution";
                    readonly lat: "40.7484284";
                    readonly lon: "-73.98565462";
                    readonly boundingbox: readonly ["40.7479226", "40.7489422", "-73.9864855", "-73.9848259"];
                    readonly class: "office";
                    readonly type: "yes";
                    readonly display_name: "Empire State Building, 350, 5th Avenue, Midtown South, Manhattan, New York, New York, 10001, USA";
                    readonly display_place: "Empire State Building";
                    readonly display_address: "350, 5th Avenue, Midtown South, Manhattan, New York, New York, 10001, USA";
                    readonly address: {
                        readonly name: "Empire State Building";
                        readonly house_number: "350";
                        readonly road: "5th Avenue";
                        readonly neighbourhood: "Midtown South";
                        readonly suburb: "Manhattan";
                        readonly city: "New York";
                        readonly state: "New York";
                        readonly postcode: "10001";
                        readonly country: "United States of America";
                        readonly country_code: "us";
                    };
                }];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Balance: {
    readonly response: {
        readonly "200": {
            readonly title: "balance";
            readonly type: "object";
            readonly properties: {
                readonly status: {
                    readonly type: "string";
                    readonly description: "`ok` on success.\n";
                    readonly examples: readonly ["ok"];
                };
                readonly balance: {
                    readonly title: "daybalance";
                    readonly type: "object";
                    readonly description: "An array comprising individual components such as `day` and `bonus`.";
                    readonly properties: {
                        readonly day: {
                            readonly type: "integer";
                            readonly description: "Balance of requests credits in your account for the day.";
                            readonly examples: readonly [547933];
                        };
                        readonly bonus: {
                            readonly type: "integer";
                            readonly description: "Balance of bonus / promotional request credits in your account.";
                            readonly examples: readonly [123];
                        };
                    };
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly day: 30000;
                            readonly bonus: 0;
                        };
                    };
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly status: "ok";
                    readonly balance: {
                        readonly day: 30000;
                        readonly bonus: 0;
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Directions: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly profile: {
                    readonly type: "string";
                    readonly examples: readonly ["driving"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Mode of transportation. Only `driving` is supported at the moment. ";
                };
                readonly coordinates: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)";
                };
            };
            readonly required: readonly ["profile", "coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly bearings: {
                    readonly type: "string";
                    readonly examples: readonly ["10,20;40,30;30,9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`";
                };
                readonly radiuses: {
                    readonly type: "string";
                    readonly examples: readonly ["500;200;300"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)";
                };
                readonly hints: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`";
                };
                readonly alternatives: {
                    readonly type: "number";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search for alternative routes. Passing a number alternatives=n searches for up to n alternative routes.\nAccepted value: `true`, `false` (default), or Number";
                };
                readonly steps: {
                    readonly type: "string";
                    readonly examples: readonly ["true"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route steps for each route leg.\nAccepted value:  `true`, `false` (default)";
                };
                readonly annotations: {
                    readonly type: "string";
                    readonly default: "false";
                    readonly examples: readonly ["false"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional metadata for each coordinate along the route geometry.\nAccepted value: `true`, `false` (default), `nodes`, `distance`, `duration`, `datasources`, `weight`, `speed`";
                };
                readonly geometries: {
                    readonly type: "string";
                    readonly default: "polyline";
                    readonly examples: readonly ["polyline"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route geometry format (influences overview and per step). Accepted value: `polyline` (default), `polyline6`, `geojson`";
                };
                readonly overview: {
                    readonly type: "string";
                    readonly default: "simplified";
                    readonly examples: readonly ["simplified"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all.\nAccepted value: `simplified` (default), `full`, `false`";
                };
                readonly continue_straight: {
                    readonly type: "string";
                    readonly default: "default";
                    readonly examples: readonly ["default"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Forces the route to keep going straight at waypoints constraining uturns there even if it would be faster.\nAccepted value: `default` (default), `true`, `false`. Default value depends on the profile. ";
                };
                readonly waypoints: {
                    readonly type: "string";
                    readonly examples: readonly ["0;1;2"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Treats input coordinates indicated by given indices as waypoints in returned Match object. Default is to treat all input coordinates as waypoints. `{index};{index};{index}... ]`";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Directions";
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "string";
                    readonly waypoints: readonly [{
                        readonly distance: 0;
                        readonly location: readonly [0];
                    }];
                    readonly routes: readonly [];
                };
            };
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "If the request was successful `Ok` otherwise see the service dependent and general status codes.";
                };
                readonly waypoints: {
                    readonly type: "array";
                    readonly description: "Object used to describe waypoint on a route.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly hint: {
                                readonly type: "string";
                                readonly "x-stoplight": {
                                    readonly id: "to7sli9hdk2jt";
                                };
                                readonly description: "The distance, in meters, from the input coordinate to the snapped coordinate.";
                            };
                            readonly distance: {
                                readonly type: "number";
                                readonly description: "The distance, in meters, from the input coordinate to the snapped coordinate.";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly "x-stoplight": {
                                    readonly id: "5vuo71t8c0zy4";
                                };
                                readonly description: "Unique internal identifier of the segment (ephemeral, not constant over data updates)\n   This can be used on subsequent request to significantly speed up the query and to connect multiple services.\n   E.g. you can use the `hint` value obtained by the `nearest` query as `hint` values for `route` inputs.";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly description: "Array that contains the `[longitude, latitude]` pair of the snapped coordinate.";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                        };
                    };
                };
                readonly routes: {
                    readonly title: "Routes";
                    readonly type: "array";
                    readonly description: "Represents a route through (potentially multiple) waypoints.";
                    readonly items: {
                        readonly title: "Route";
                        readonly type: "object";
                        readonly properties: {
                            readonly legs: {
                                readonly type: "array";
                                readonly description: "Represents a route between two waypoints.";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly steps: {
                                            readonly type: "array";
                                            readonly description: "A step consists of a maneuver such as a turn or merge, followed\nby a distance of travel along a single way to the subsequent\nstep.\n\nDepends on the `steps` parameter.\n\n| steps        |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | array of `RouteStep` objects describing the turn-by-turn instructions |\n| false        | empty array                                                           |";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly intersections: {
                                                        readonly type: "object";
                                                        readonly description: "An intersection gives a full representation of any cross-way the path passes bay. For every step, the very first intersection (`intersections[0]`) corresponds to the\nlocation of the StepManeuver. Further intersections are listed for every cross-way until the next turn instruction.";
                                                        readonly properties: {
                                                            readonly location: {
                                                                readonly type: "array";
                                                                readonly description: "A `[longitude, latitude]` pair describing the location of the turn.";
                                                                readonly items: {
                                                                    readonly type: "number";
                                                                };
                                                            };
                                                            readonly in: {
                                                                readonly type: "number";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "lskt57vdr20n9";
                                                                };
                                                                readonly description: "index into bearings/entry array. Used to calculate the bearing just before the turn. Namely, the clockwise angle from true north to the\n  direction of travel immediately before the maneuver/passing the intersection. Bearings are given relative to the intersection. To get the bearing\n  in the direction of driving, the bearing has to be rotated by a value of 180. The value is not supplied for `depart` maneuvers.";
                                                            };
                                                            readonly out: {
                                                                readonly type: "number";
                                                                readonly description: "index into the bearings/entry array. Used to extract the bearing just after the turn. Namely, The clockwise angle from true north to the\n  direction of travel immediately after the maneuver/passing the intersection. The value is not supplied for `arrive` maneuvers.";
                                                            };
                                                            readonly bearings: {
                                                                readonly type: "number";
                                                                readonly description: "A list of bearing values (e.g. [0,90,180,270]) that are available at the intersection. The bearings describe all available roads at the intersection. Values are between 0-359 (0=true north)";
                                                            };
                                                            readonly entry: {
                                                                readonly type: "string";
                                                                readonly description: "A list of entry flags, corresponding in a 1:1 relationship to the bearings. A value of `true` indicates that the respective road could be entered on a valid route.\n  `false` indicates that the turn onto the respective road would violate a restriction.";
                                                            };
                                                            readonly classes: {
                                                                readonly type: "array";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "8eciacki4fjia";
                                                                };
                                                                readonly description: "An array of strings signifying the classes (as specified in the profile) of the road exiting the intersection.";
                                                                readonly items: {
                                                                    readonly "x-stoplight": {
                                                                        readonly id: "zl73uiawtykik";
                                                                    };
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                            readonly lanes: {
                                                                readonly type: "array";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "cbz5c1js7urfb";
                                                                };
                                                                readonly description: "A `Lane` represents a turn lane at the corresponding turn location.";
                                                                readonly items: {
                                                                    readonly "x-stoplight": {
                                                                        readonly id: "2belpw9ad3exo";
                                                                    };
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly indications: {
                                                                            readonly type: "string";
                                                                            readonly "x-stoplight": {
                                                                                readonly id: "c4au3wfzuqkb3";
                                                                            };
                                                                            readonly description: "An indication (e.g. marking on the road) specifying the turn lane. A road can have multiple indications (e.g. an arrow pointing straight and left). The indications are given in an array, each containing one of the following types. Further indications might be added on without an API version change.\n\n| `value`                | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `none`                 | No dedicated indication is shown.                                                                                         |\n| `uturn`                | An indication signaling the possibility to reverse (i.e. fully bend arrow).                                               |\n| `sharp right`          | An indication indicating a sharp right turn (i.e. strongly bend arrow).                                                   |\n| `right`                | An indication indicating a right turn (i.e. bend arrow).                                                                  |\n| `slight right`         | An indication indicating a slight right turn (i.e. slightly bend arrow).                                                  |\n| `straight`             | No dedicated indication is shown (i.e. straight arrow).                                                                   |\n| `slight left`          | An indication indicating a slight left turn (i.e. slightly bend arrow).                                                   |\n| `left`                 | An indication indicating a left turn (i.e. bend arrow).                                                                   |\n| `sharp left`           | An indication indicating a sharp left turn (i.e. strongly bend arrow).                                                    |";
                                                                        };
                                                                        readonly valid: {
                                                                            readonly type: "string";
                                                                            readonly "x-stoplight": {
                                                                                readonly id: "rm2ay92cpk5dn";
                                                                            };
                                                                            readonly description: "A boolean flag (represented as `string`) indicating whether the lane is a valid choice in the current maneuver.";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly driving_side: {
                                                        readonly type: "string";
                                                        readonly description: "The legal driving side at the location for this step. Either `left` or `right`.";
                                                    };
                                                    readonly geometry: {
                                                        readonly type: "string";
                                                        readonly description: "The unsimplified geometry of the route segment, depending on the `geometries` parameter.\n\n| `geometry` |                                                                    |\n|------------|--------------------------------------------------------------------|\n| polyline   | [polyline](https://www.npmjs.com/package/polyline) with precision 5 in [latitude,longitude] encoding |\n| polyline6  | [polyline](https://www.npmjs.com/package/polyline) with precision 6 in [latitude,longitude] encoding |\n| geojson    | [GeoJSON `LineString`](http://geojson.org/geojson-spec.html#linestring) |";
                                                    };
                                                    readonly duration: {
                                                        readonly type: "number";
                                                        readonly description: "The estimated travel time, in `float` number of seconds.";
                                                    };
                                                    readonly distance: {
                                                        readonly type: "number";
                                                        readonly description: "The distance of travel from the maneuver to the subsequent step, in `float` meters.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the way along which travel proceeds.";
                                                    };
                                                    readonly weight: {
                                                        readonly type: "number";
                                                        readonly description: "The calculated weight of the step.";
                                                    };
                                                    readonly mode: {
                                                        readonly type: "string";
                                                        readonly description: "A string signifying the mode of transportation.";
                                                    };
                                                    readonly maneuver: {
                                                        readonly type: "array";
                                                        readonly description: "A `StepManeuver` object representing the maneuver.";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly bearing_after: {
                                                                    readonly type: "number";
                                                                    readonly description: "The clockwise angle from true north to the\n  direction of travel immediately after the maneuver. Range 0-359.";
                                                                };
                                                                readonly location: {
                                                                    readonly type: "array";
                                                                    readonly description: "A `[longitude, latitude]` pair describing the location of the turn.";
                                                                    readonly items: {
                                                                        readonly type: "number";
                                                                    };
                                                                };
                                                                readonly type: {
                                                                    readonly type: "string";
                                                                    readonly description: "A string indicating the type of maneuver. **new identifiers might be introduced without API change**\n\n| `type`           | Description                                                  |\n|------------------|--------------------------------------------------------------|\n| `turn`           | a basic turn into direction of the `modifier`                |\n| `new name`       | no turn is taken/possible, but the road name changes. The road can take a turn itself, following `modifier`.                  |\n| `depart`         | indicates the departure of the leg                           |\n| `arrive`         | indicates the destination of the leg                         |\n| `merge`          | merge onto a street (e.g. getting on the highway from a ramp, the `modifier specifies the direction of the merge`) |\n| `ramp`           | **Deprecated**. Replaced by `on_ramp` and `off_ramp`.        |\n| `on ramp`        | take a ramp to enter a highway (direction given my `modifier`) |\n| `off ramp`       | take a ramp to exit a highway (direction given my `modifier`)  |\n| `fork`           | take the left/right side at a fork depending on `modifier`   |\n| `end of road`    | road ends in a T intersection turn in direction of `modifier`|\n| `use lane`       | **Deprecated** replaced by lanes on all intersection entries |\n| `continue`       | Turn in direction of `modifier` to stay on the same road     |\n| `roundabout`     | traverse roundabout, if the route leaves the roundabout there will be an additional property `exit` for exit counting. The modifier specifies the direction of entering the roundabout. |\n| `rotary`         | a traffic circle. While very similar to a larger version of a roundabout, it does not necessarily follow roundabout rules for right of way. It can offer `rotary_name` and/or `rotary_pronunciation` parameters (located in the RouteStep object) in addition to the `exit` parameter (located on the StepManeuver object).  |\n| `roundabout turn`| Describes a turn at a small roundabout that should be treated as normal turn. The `modifier` indicates the turn direction. Example instruction: `At the roundabout turn left`. |\n| `notification`   | not an actual turn but a change in the driving conditions. For example the travel mode or classes. If the road takes a turn itself, the `modifier` describes the direction |\n| `exit roundabout`| Describes a maneuver exiting a roundabout (usually preceded by a `roundabout` instruction) |\n| `exit rotary`    | Describes the maneuver exiting a rotary (large named roundabout) |";
                                                                };
                                                                readonly bearing_before: {
                                                                    readonly type: "number";
                                                                    readonly description: "he clockwise angle from true north to the\n  direction of travel immediately before the maneuver. Range 0-359.";
                                                                };
                                                                readonly modifier: {
                                                                    readonly type: "string";
                                                                    readonly description: "An optional `string` indicating the direction change of the maneuver.\n\n| `modifier`        | Description                               |\n|-------------------|-------------------------------------------|\n| `uturn`           | indicates  reversal of direction          |\n| `sharp right`     | a sharp right turn                        |\n| `right`           | a normal turn to the right                |\n| `slight right`    | a slight turn to the right                |\n| `straight`        | no relevant change in direction           |\n| `slight left`     | a slight turn to the left                 |\n| `left`            | a normal turn to the left                 |\n| `sharp left`      | a sharp turn to the left                  |\n\n The list of turns without a modifier is limited to: `depart/arrive`. If the source/target location is close enough to the `depart/arrive` location, no modifier will be given.\n\n  The meaning depends on the `type` property.\n\n| `type`                 | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `turn`                 | `modifier` indicates the change in direction accomplished through the turn                                                |\n| `depart`/`arrive`      | `modifier` indicates the position of departure point and arrival point in relation to the current direction of travel     |\n\n- `exit` An optional `integer` indicating number of the exit to take. The property exists for the `roundabout` / `rotary` property:\n  Number of the roundabout exit to take. If exit is `undefined` the destination is on the roundabout.\n\n\nNew properties (potentially depending on `type`) may be introduced in the future without an API version change.";
                                                                };
                                                                readonly ref: {
                                                                    readonly type: "string";
                                                                    readonly description: "A reference number or code for the way. Optionally included, if ref data is available for the given way.";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly weight: {
                                            readonly type: "number";
                                            readonly description: "The calculated weight of the route leg.";
                                        };
                                        readonly distance: {
                                            readonly type: "number";
                                            readonly description: "The distance traveled by this route leg, in `float` meters.\n";
                                        };
                                        readonly annotations: {
                                            readonly type: "object";
                                            readonly description: "Additional details about each coordinate along the route geometry, with fine-grained information about each segment or node id.\n\n| annotations  |                                                                               |\n|--------------|-------------------------------------------------------------------------------|\n| true         | An `Annotation` object containing node ids, durations, distances and weights. |\n| false        | `undefined`                                                                   |\n";
                                            readonly properties: {
                                                readonly speed: {
                                                    readonly type: "array";
                                                    readonly description: "Convenience field, calculation of `distance / duration` rounded to one decimal place.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly metadata: {
                                                    readonly type: "object";
                                                    readonly description: "Metadata related to other annotations.";
                                                    readonly properties: {
                                                        readonly datasource_names: {
                                                            readonly type: "array";
                                                            readonly description: "The names of the datasources used for the speed between each pair of coordinates. `lua profile` is the default profile, other values are the filenames supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`.";
                                                            readonly items: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly nodes: {
                                                    readonly type: "array";
                                                    readonly description: "The OSM node ID for each coordinate along the route, excluding the first/last user-supplied coordinates.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly duration: {
                                                    readonly type: "array";
                                                    readonly description: "The duration between each pair of coordinates, in seconds. Does not include the duration of any turns.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly distance: {
                                                    readonly type: "array";
                                                    readonly description: "The distance, in meters, between each pair of coordinates.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly weight: {
                                                    readonly type: "array";
                                                    readonly description: "The weights between each pair of coordinates. Does not include any turn costs.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly datasources: {
                                                    readonly type: "array";
                                                    readonly description: "The index of the datasource for the speed between each pair of coordinates. `0` is the default profile, other values are supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`. String-like names are in the `metadata.datasource_names` array.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                            };
                                        };
                                        readonly summary: {
                                            readonly type: "string";
                                            readonly description: "Summary of the route taken as `string`. Depends on the `summary` parameter.\n\n| summary      |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | Names of the two major roads used. Can be empty if route is too short.|\n| false        | empty `string`                                                        |";
                                        };
                                        readonly duration: {
                                            readonly type: "string";
                                            readonly description: "The estimated travel time, in `float` number of seconds.";
                                        };
                                    };
                                };
                            };
                            readonly weight_name: {
                                readonly type: "string";
                            };
                            readonly geometry: {
                                readonly type: "string";
                            };
                            readonly weight: {
                                readonly type: "number";
                            };
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly duration: {
                                readonly type: "number";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetTimezone: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [40.748442];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Latitude of the location to generate an address for.";
                };
                readonly lon: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [-73.985658];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Longitude of the location to generate an address for.";
                };
                readonly timestamp: {
                    readonly type: "number";
                    readonly examples: readonly [1701179610];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Unix epoch time in seconds (number of seconds since January 1, 1970, 00:00:00 UTC). Defaults to current time if omitted. This parameter allows retrieval of time zone information for specific moments, which is useful for handling Daylight Saving Time changes and ensuring correct time zone offsets for historical data or future event scheduling.";
                };
            };
            readonly required: readonly ["lat", "lon"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly timezone: {
                        readonly name: "Asia/Kolkata";
                        readonly now_in_dst: 0;
                        readonly offset_sec: 19800;
                        readonly short_name: "IST";
                        readonly full_name: "India Standard Time";
                    };
                };
            };
            readonly properties: {
                readonly timezone: {
                    readonly type: "object";
                    readonly description: "Timezone object found for the location.";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Timezone identifier, compatible with the IANA Tz Database. Typically in the format \"Area/Location\" (e.g., \"America/New_York\", \"Europe/Paris\"), but can also include ocean areas (e.g., \"Atlantic/Azores\") and special administrative zones (e.g., \"Etc/UTC\", \"Etc/GMT-14\"). We always return the most current identifier (e.g., \"Asia/Kolkata\", not \"Asia/Calcutta\"). Note that \"Etc/GMT\" zones use POSIX-style signs, opposite to ISO 8601 convention (e.g., \"Etc/GMT-14\" is 14 hours ahead of GMT).";
                        };
                        readonly now_in_dst: {
                            readonly type: "integer";
                            readonly description: "Represents whether the zone currently observing `DST` or not.";
                        };
                        readonly offset_sec: {
                            readonly type: "integer";
                            readonly description: "The offset from `UTC` (in seconds) for the given location. Considers `DST` savings.";
                        };
                        readonly short_name: {
                            readonly type: "string";
                            readonly description: "Time zone abbreviation, usually 3 or 4 letters (e.g., \"EDT\" for Eastern Daylight Time, \"CEST\" for Central European Summer Time). In some cases, especially for locations without standardized abbreviations, it may be a numeric UTC offset (e.g., \"+03\" or \"+0330\").";
                        };
                        readonly full_name: {
                            readonly type: "string";
                            readonly "x-stoplight": {
                                readonly id: "1qb7hcby2gwow";
                            };
                            readonly description: "Complete, descriptive name of the time zone, e.g. \"Pacific Daylight Time\" or \"Central European Standard Time\". For some locations (e.g., oceans) where such a name is unavailable, it is returned in the format of GMT±HH:MM (e.g., GMT+03:30).";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Lookup: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly osm_ids: {
                    readonly type: "string";
                    readonly examples: readonly ["R146656,W104393803,N240109189"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "This must contain a comma-separated list of OSM ids each prefixed with its type, one of node(N), way(W) or relation(R). Up to 3 ids can be queried at the same time.";
                };
                readonly json_callback: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats.";
                };
                readonly addressdetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a breakdown of the address of this result into elements. Important components include (but not limited to) country, postcode, state, county, city, town. Only those elements that are available for a given location will be returned.";
                };
                readonly extratags: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`.";
                };
                readonly namedetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`.";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly polygon_geojson: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in geojson format. Defaults to `0`.";
                };
                readonly polygon_kml: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in kml format. Defaults to `0`.";
                };
                readonly polygon_svg: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in svg format. Defaults to `0`.";
                };
                readonly polygon_text: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results as a WKT. Defaults to `0`.";
                };
                readonly polygon_threshold: {
                    readonly type: "number";
                    readonly default: 0;
                    readonly examples: readonly [0.2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.";
                };
                readonly normalizeaddress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly postaladdress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`.";
                };
                readonly statecode: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output Format. Only `json` supported as of now.";
                };
            };
            readonly required: readonly ["osm_ids"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly place_id: 115462561;
                    readonly licence: "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright";
                    readonly osm_type: "way";
                    readonly osm_id: 50637691;
                    readonly boundingbox: readonly ["52.3994612", "52.3996426", "13.0479574", "13.0481754"];
                    readonly lat: "52.399550700000006";
                    readonly lon: "13.048066846939687";
                    readonly display_name: "Brandenburger Tor, Brandenburger Straße, Historische Innenstadt, Innenstadt, Potsdam, Brandenburg, 14467, Germany";
                    readonly class: "tourism";
                    readonly type: "attraction";
                    readonly address: {
                        readonly tourism: "Brandenburger Tor";
                        readonly road: "Brandenburger Straße";
                        readonly suburb: "Historische Innenstadt";
                        readonly city: "Potsdam";
                        readonly state: "Brandenburg";
                        readonly postcode: "14467";
                        readonly country: "Germany";
                        readonly country_code: "de";
                    };
                    readonly extratags: {
                        readonly image: "http://commons.wikimedia.org/wiki/File:Potsdam_brandenburger_tor.jpg";
                        readonly heritage: "4";
                        readonly wikidata: "Q695045";
                        readonly architect: "Carl von Gontard;Georg Christian Unger";
                        readonly wikipedia: "de:Brandenburger Tor (Potsdam)";
                        readonly wheelchair: "yes";
                        readonly description: "Kleines Brandenburger Tor in Potsdam";
                        readonly "heritage:website": "http://www.bldam-brandenburg.de/images/stories/PDF/DML%202012/04-p-internet-13.pdf";
                        readonly "heritage:operator": "bldam";
                        readonly "architect:wikidata": "Q68768;Q95223";
                        readonly year_of_construction: "1771";
                    };
                };
            };
            readonly properties: {
                readonly place_id: {
                    readonly type: "integer";
                    readonly description: "Unique identifier for the place.";
                };
                readonly licence: {
                    readonly type: "string";
                    readonly description: "License information for the data.";
                };
                readonly osm_type: {
                    readonly type: "string";
                    readonly description: "Type of OpenStreetMap object.";
                };
                readonly osm_id: {
                    readonly type: "integer";
                    readonly description: "Unique identifier for the OpenStreetMap object.";
                };
                readonly boundingbox: {
                    readonly type: "array";
                    readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                    readonly items: {
                        readonly type: "string";
                    };
                };
                readonly lat: {
                    readonly type: "string";
                    readonly description: "Latitude of the location.";
                };
                readonly lon: {
                    readonly type: "string";
                    readonly description: "Longitude of the location.\n";
                };
                readonly display_name: {
                    readonly type: "string";
                    readonly description: "Formatted address for display.";
                };
                readonly class: {
                    readonly type: "string";
                    readonly description: "Categorization of map features based on their nature.";
                };
                readonly type: {
                    readonly type: "string";
                    readonly description: "It denotes the specific kind of feature within a class.";
                };
                readonly address: {
                    readonly title: "address";
                    readonly type: "object";
                    readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                    readonly properties: {
                        readonly house_number: {
                            readonly type: "string";
                            readonly description: "House number";
                            readonly examples: readonly ["3894"];
                        };
                        readonly road: {
                            readonly type: "string";
                            readonly description: "Road name";
                            readonly examples: readonly ["Spring Mill Way"];
                        };
                        readonly neighbourhood: {
                            readonly type: "string";
                            readonly description: "Neighbourhood";
                        };
                        readonly hamlet: {
                            readonly type: "string";
                            readonly description: "Hamlet";
                        };
                        readonly suburb: {
                            readonly type: "string";
                            readonly description: "Suburb";
                        };
                        readonly village: {
                            readonly type: "string";
                            readonly description: "Village name";
                            readonly examples: readonly ["Landen"];
                        };
                        readonly town: {
                            readonly type: "string";
                            readonly description: "Town name";
                        };
                        readonly city_district: {
                            readonly type: "string";
                            readonly description: "Administrative area between city level and town level";
                        };
                        readonly city: {
                            readonly type: "string";
                            readonly description: "City name";
                            readonly examples: readonly ["Landen"];
                        };
                        readonly region: {
                            readonly type: "string";
                            readonly description: "Region name";
                        };
                        readonly county: {
                            readonly type: "string";
                            readonly description: "County name";
                            readonly examples: readonly ["Warren County"];
                        };
                        readonly state_district: {
                            readonly type: "string";
                            readonly description: "District name";
                        };
                        readonly state: {
                            readonly type: "string";
                            readonly description: "State name";
                            readonly examples: readonly ["Ohio"];
                        };
                        readonly state_code: {
                            readonly type: "string";
                            readonly description: "State code";
                            readonly examples: readonly ["oh"];
                        };
                        readonly postcode: {
                            readonly type: "string";
                            readonly description: "Postal code";
                            readonly examples: readonly ["45039"];
                        };
                        readonly country: {
                            readonly type: "string";
                            readonly description: "Country name";
                            readonly examples: readonly ["United States of America"];
                        };
                        readonly country_code: {
                            readonly type: "string";
                            readonly description: "Country code";
                            readonly examples: readonly ["us"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Name of the entity/road in the given location";
                        };
                        readonly water: {
                            readonly type: "string";
                            readonly "x-stoplight": {
                                readonly id: "7nunw3epqpcqo";
                            };
                            readonly description: "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions.";
                        };
                    };
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly house_number: "3894";
                            readonly road: "Spring Mill Way";
                            readonly residential: "Hunter’s Point";
                            readonly village: "Landen";
                            readonly city: "Landen";
                            readonly county: "Warren County";
                            readonly state: "Ohio";
                            readonly postcode: "45039";
                            readonly country: "United States of America";
                            readonly country_code: "us";
                            readonly state_code: "oh";
                        };
                        readonly "Result from Ocean": {
                            readonly house_number: "3894";
                            readonly road: "Spring Mill Way";
                            readonly residential: "Hunter’s Point";
                            readonly village: "Landen";
                            readonly city: "Landen";
                            readonly county: "Warren County";
                            readonly state: "Ohio";
                            readonly postcode: "45039";
                            readonly country: "United States of America";
                            readonly country_code: "us";
                            readonly state_code: "oh";
                        };
                        readonly "Example 2": {
                            readonly name: "South Pacific Ocean";
                            readonly water: "South Pacific Ocean";
                        };
                    };
                };
                readonly extratags: {
                    readonly type: "object";
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly ele: "15";
                            readonly height: "443.2";
                            readonly wikidata: "Q9188";
                            readonly wikipedia: "en:Empire State Building";
                            readonly start_date: "1931";
                            readonly wheelchair: "yes";
                            readonly "building:use": "office";
                            readonly opening_hours: "Mo-Su 08:00-02:00";
                            readonly "building:levels": "102";
                            readonly construction_date: "1930-1931";
                        };
                    };
                    readonly description: "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n";
                    readonly additionalProperties: true;
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Matching: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly profile: {
                    readonly type: "string";
                    readonly examples: readonly ["driving"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Mode of transportation. Only `driving` is supported at the moment. ";
                };
                readonly coordinates: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)";
                };
            };
            readonly required: readonly ["profile", "coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly bearings: {
                    readonly type: "string";
                    readonly examples: readonly ["10,20;40,30;30,9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`";
                };
                readonly radiuses: {
                    readonly type: "string";
                    readonly examples: readonly ["500;200;300"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)";
                };
                readonly hints: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`";
                };
                readonly steps: {
                    readonly type: "string";
                    readonly examples: readonly ["true"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route steps for each route leg.\nAccepted value:  `true`, `false` (default)";
                };
                readonly geometries: {
                    readonly type: "string";
                    readonly default: "polyline";
                    readonly examples: readonly ["polyline"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route geometry format (influences overview and per step). Accepted value: `polyline` (default), `polyline6`, `geojson`";
                };
                readonly annotations: {
                    readonly type: "string";
                    readonly default: "false";
                    readonly examples: readonly ["false"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional metadata for each coordinate along the route geometry.\nAccepted value: `true`, `false` (default), `nodes`, `distance`, `duration`, `datasources`, `weight`, `speed`";
                };
                readonly overview: {
                    readonly type: "string";
                    readonly default: "simplified";
                    readonly examples: readonly ["simplified"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all.\nAccepted value: `simplified` (default), `full`, `false`";
                };
                readonly timestamps: {
                    readonly type: "string";
                    readonly examples: readonly ["200;300;900"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "'Timestamps for the input locations in seconds since UNIX epoch. Timestamps need to be monotonically increasing. \nAccepted value: `{timestamp};{timestamp}[;{timestamp} ...]`\nEach `{timestamp}` has the following format: integer seconds since UNIX epoch'";
                };
                readonly gaps: {
                    readonly type: "string";
                    readonly default: "split";
                    readonly examples: readonly ["ignore"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Allows the input track splitting based on huge timestamp gaps between points. Accepted value: `split` (default), `ignore`";
                };
                readonly tidy: {
                    readonly type: "string";
                    readonly default: "false";
                    readonly examples: readonly ["false"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Allows the input track modification to obtain better matching quality for noisy tracks. Accepted value: `true`, `false` (default).";
                };
                readonly waypoints: {
                    readonly type: "string";
                    readonly examples: readonly ["0;1;2"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Treats input coordinates indicated by given indices as waypoints in returned Match object. Default is to treat all input coordinates as waypoints. `{index};{index};{index}... ]`";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Matching";
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "If the request was successful `Ok` otherwise see the service dependent and general status codes.";
                };
                readonly tracepoints: {
                    readonly type: "array";
                    readonly description: "Array of `Waypoint` objects representing all points of the trace in order.\n\nIf the trace point was omitted by map matching because it is an outlier, the entry will be `null`.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly waypoint_index: {
                                readonly type: "integer";
                                readonly description: "Index of the waypoint inside the matched route.";
                            };
                            readonly matchings_index: {
                                readonly type: "integer";
                                readonly description: "Index to the `Route` object in `matchings` the sub-trace was matched to.";
                            };
                            readonly alternatives_count: {
                                readonly type: "integer";
                                readonly description: "Number of probable alternative matchings for this trace point. A value of zero indicate that this point was matched unambiguously. Split the trace at these points for incremental map matching.";
                            };
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly matchings: {
                    readonly type: "array";
                    readonly description: "An array of `Route` objects that assemble the trace.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly duration: {
                                readonly type: "number";
                            };
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly weight: {
                                readonly type: "number";
                            };
                            readonly geometry: {
                                readonly type: "string";
                            };
                            readonly confidence: {
                                readonly type: "number";
                                readonly description: "Confidence of the matching. `float` value between 0 and 1. 1 is very confident that the matching is correct.";
                            };
                            readonly weight_name: {
                                readonly type: "string";
                            };
                            readonly legs: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly steps: {
                                            readonly type: "array";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly intersections: {
                                                        readonly type: "object";
                                                        readonly properties: {
                                                            readonly out: {
                                                                readonly type: "number";
                                                            };
                                                            readonly entry: {
                                                                readonly type: "string";
                                                            };
                                                            readonly location: {
                                                                readonly type: "array";
                                                                readonly items: {
                                                                    readonly type: "number";
                                                                };
                                                            };
                                                            readonly bearings: {
                                                                readonly type: "number";
                                                            };
                                                        };
                                                    };
                                                    readonly driving_side: {
                                                        readonly type: "string";
                                                    };
                                                    readonly geometry: {
                                                        readonly type: "string";
                                                    };
                                                    readonly duration: {
                                                        readonly type: "number";
                                                    };
                                                    readonly distance: {
                                                        readonly type: "number";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                    };
                                                    readonly weight: {
                                                        readonly type: "number";
                                                    };
                                                    readonly mode: {
                                                        readonly type: "string";
                                                    };
                                                    readonly maneuver: {
                                                        readonly type: "array";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly bearing_after: {
                                                                    readonly type: "number";
                                                                };
                                                                readonly location: {
                                                                    readonly type: "array";
                                                                    readonly items: {
                                                                        readonly type: "number";
                                                                    };
                                                                };
                                                                readonly type: {
                                                                    readonly type: "string";
                                                                };
                                                                readonly bearing_before: {
                                                                    readonly type: "number";
                                                                };
                                                                readonly modifier: {
                                                                    readonly type: "string";
                                                                };
                                                                readonly ref: {
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly weight: {
                                            readonly type: "number";
                                        };
                                        readonly distance: {
                                            readonly type: "number";
                                        };
                                        readonly summary: {
                                            readonly type: "string";
                                        };
                                        readonly duration: {
                                            readonly type: "string";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Matrix: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly profile: {
                    readonly type: "string";
                    readonly examples: readonly ["driving"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Mode of transportation. Only `driving` is supported at the moment. ";
                };
                readonly coordinates: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)";
                };
            };
            readonly required: readonly ["profile", "coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly bearings: {
                    readonly type: "string";
                    readonly examples: readonly ["10,20;40,30;30,9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`";
                };
                readonly radiuses: {
                    readonly type: "string";
                    readonly examples: readonly ["500;200;300"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)";
                };
                readonly hints: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`";
                };
                readonly sources: {
                    readonly type: "integer";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Use location with given index as source. Accepted value: `{index};{index}[;{index} ...]` or `all` (default). \nEach `{index}` has the following format: 0 <= integer < #locations";
                };
                readonly destinations: {
                    readonly type: "integer";
                    readonly examples: readonly [2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Use location with given index as destination.\nAccepted value: `{index};{index}[;{index} ...]` or `all` (default)\nEach `{index}` has the following format: 0 <= integer < #locations";
                };
                readonly annotations: {
                    readonly type: "string";
                    readonly default: "false";
                    readonly examples: readonly ["false"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional metadata for each coordinate along the route geometry.\nAccepted value: `true`, `false` (default), `nodes`, `distance`, `duration`, `datasources`, `weight`, `speed`";
                };
                readonly fallback_speed: {
                    readonly type: "number";
                    readonly examples: readonly [25.65];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If no route found between a source/destination pair, calculate the as-the-crow-flies distance,  then use this speed to estimate duration. \nAccepted value: double > 0";
                };
                readonly fallback_coordinate: {
                    readonly type: "string";
                    readonly default: "input";
                    readonly examples: readonly ["snapped"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When using a fallback_speed, use the user-supplied coordinate (input), or the snapped location (snapped) for calculating distances. \nAccepted value: `input` (default), or `snapped`.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Matrix";
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "If the request was successful `Ok` otherwise see the service dependent and general status codes.";
                };
                readonly distances: {
                    readonly type: "array";
                    readonly description: "array of arrays that stores the matrix in row-major order. `distances[i][j]` gives the travel distance from\n  the i-th waypoint to the j-th waypoint. Values are given in meters. Can be `null` if no route between `i` and `j` can be found.";
                    readonly items: {
                        readonly type: "array";
                        readonly items: {
                            readonly "x-stoplight": {
                                readonly id: "47kxducsjqmpa";
                            };
                            readonly type: "number";
                        };
                    };
                };
                readonly durations: {
                    readonly type: "array";
                    readonly "x-stoplight": {
                        readonly id: "1dbpasj6bvxow";
                    };
                    readonly description: "array of arrays that stores the matrix in row-major order. `durations[i][j]` gives the travel time from\n  the i-th waypoint to the j-th waypoint. Values are given in seconds. Can be `null` if no route between `i` and `j` can be found.";
                    readonly items: {
                        readonly "x-stoplight": {
                            readonly id: "d0uif6pp5vwkx";
                        };
                        readonly type: "array";
                        readonly items: {
                            readonly "x-stoplight": {
                                readonly id: "l20aqj8f0wgop";
                            };
                            readonly type: "number";
                        };
                    };
                };
                readonly fallback_speed_cells: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "number";
                    };
                };
                readonly sources: {
                    readonly type: "array";
                    readonly description: "array of `Waypoint` objects describing all sources in order.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                    };
                };
                readonly destinations: {
                    readonly type: "array";
                    readonly description: "array of `Waypoint` objects describing all destinations in order.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Nearby: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [40.748442];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Latitude of the location to generate an address for.";
                };
                readonly lon: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [-73.985658];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Longitude of the location to generate an address for.";
                };
                readonly tag: {
                    readonly type: "string";
                    readonly examples: readonly ["amenity:school"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "You can use a `tag` to restrict your results on the Nearby API. We support two types of tags, a single-word format for common use-cases and key-value pairs for advanced use-cases.\n\n### 1. Single-word Format (Simple)\nFor most use-cases, the list of tags below should suffice. Multiple tags can be specified as a comma-separated list.\n\nTag             | Description\n----------------| -----------\nall             | Return a list of all PoIs\nairport         | List of airports\nrestaurant      | List of restaurants\nbank            | List of banks\natm             | List of ATMs\nhotel           | List of hotels\npub             | List of pubs\nbus_station     | List of bus stations\nrailway_station | List of railway stations\ncinema          | List of cinema theatres\nhospital        | List of hospitals\ncollege         | List of colleges\nschool          | List of schools\npharmacy        | List of pharmacies\nsupermarket     | List of supermarket\nfuel            | List of fuel stations\ngym             | List of gyms\nplace_of_worship| List of places of worship\ntoilet          | List of toilets\npark            | List of parks\nstadium         | List of stadiums\nparking         | List of parking\ncardealer       | List of car dealers\n\n### 2. Key Value Format (Advanced)\nFor advanced use-cases that need additional tags not present in the table above, we also support tags based on OpenStreetMap''s (OSM)  <a href=\"https://wiki.openstreetmap.org/wiki/Map_Features\" target=\"_blank\">exhaustive list</a> of tags. These tags are represented as key-value pairs of `class` and `type` values. Multiple `class` and `type` values can be specified as a comma-separated list.\n\n**Examples:** \n* To return a list of all PoIs: tag=all\n* To return records with amenity class (e.g., restaurants, hospitals, banks): tag=amenity:*\n* To return records with the amenity class and school as type (i.e., a list of schools): tag=amenity:school\n* To return all records except those with amenity as class: tag=all,!amenity:*\n* To return all records in the amenity class except gym: tag=amenity:*,!amenity:gym\n* To return all records except elements with amenity as class and gym as type: tag=!amenity:gym\n* To return a list of airports, hotels, and parking spaces nearby: tag=aeroway:aerodrome,tourism:hotel,amenity:parking";
                };
                readonly radius: {
                    readonly type: "integer";
                    readonly default: 100;
                    readonly minimum: 1;
                    readonly maximum: 30000;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Radius (in meters) from the given latitude and longitude to search for results in.\nAccepted value: `1` to `30000`. Defaults to `100`.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`.";
                };
            };
            readonly required: readonly ["lat", "lon"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-nearby-poi";
            readonly "x-stoplight": {
                readonly id: "gpmrvu628jbn5";
            };
            readonly type: "array";
            readonly "x-examples": {
                readonly "Example 1": readonly [{
                    readonly place_id: "223483692";
                    readonly licence: "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0";
                    readonly osm_type: "way";
                    readonly osm_id: "19301621";
                    readonly boundingbox: readonly ["39.307405567782", "39.307505567782", "-84.292824851595", "-84.292724851595"];
                    readonly lat: "39.3074555677816";
                    readonly lon: "-84.2927748515948";
                    readonly display_name: "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America";
                    readonly class: "place";
                    readonly type: "house";
                    readonly importance: 0.62025;
                    readonly address: {
                        readonly name: "Empire State Building";
                        readonly house_number: "3894";
                        readonly road: "Spring Mill Way";
                        readonly residential: "Hunter’s Point";
                        readonly village: "Landen";
                        readonly county: "Warren County";
                        readonly state: "Ohio";
                        readonly postcode: "45039";
                        readonly country: "United States of America";
                        readonly country_code: "us";
                        readonly city: "Landen";
                    };
                }];
            };
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly place_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the place.";
                    };
                    readonly licence: {
                        readonly type: "string";
                        readonly description: "License information for the data.";
                    };
                    readonly osm_type: {
                        readonly type: "string";
                        readonly description: "Type of OpenStreetMap object.";
                    };
                    readonly osm_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the OpenStreetMap object.";
                    };
                    readonly lat: {
                        readonly type: "string";
                        readonly description: "Latitude of the location.";
                    };
                    readonly lon: {
                        readonly type: "string";
                        readonly description: "Longitude of the location.";
                    };
                    readonly display_name: {
                        readonly type: "string";
                        readonly description: "Formatted address for display.";
                    };
                    readonly class: {
                        readonly type: "string";
                        readonly description: "The category of this result";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The 'type' of the class/category of this result";
                    };
                    readonly address: {
                        readonly title: "address-nearby";
                        readonly "x-stoplight": {
                            readonly id: "tbe7xjx22s96f";
                        };
                        readonly type: "object";
                        readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly house_number: "350";
                                readonly road: "5th Avenue";
                                readonly neighbourhood: "Manhattan Community Board 5";
                                readonly suburb: "Manhattan";
                                readonly city: "New York";
                                readonly county: "New York County";
                                readonly state: "New York";
                                readonly postcode: "10001";
                                readonly country: "United States of America";
                                readonly country_code: "us";
                            };
                            readonly "Result from Ocean": {
                                readonly name: "South Pacific Ocean";
                            };
                            readonly "Example 2": {
                                readonly name: "South Pacific Ocean";
                            };
                        };
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "House name or Point of Interest (POI)";
                            };
                            readonly house_number: {
                                readonly type: "string";
                                readonly description: "House or Building number";
                                readonly examples: readonly ["3894"];
                            };
                            readonly road: {
                                readonly type: "string";
                                readonly description: "Roads, Highways, Freeways, Motorways";
                                readonly examples: readonly ["Spring Mill Way"];
                            };
                            readonly neighbourhood: {
                                readonly type: "string";
                                readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                            };
                            readonly suburb: {
                                readonly type: "string";
                                readonly description: "Suburbs, Subdivisions";
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                readonly examples: readonly ["Landen"];
                            };
                            readonly county: {
                                readonly type: "string";
                                readonly description: "Counties";
                                readonly examples: readonly ["Warren County"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly description: "States, Provinces, Regions, State Districts";
                                readonly examples: readonly ["Ohio"];
                            };
                            readonly state_code: {
                                readonly type: "string";
                                readonly description: "State or Province Code";
                                readonly examples: readonly ["oh"];
                            };
                            readonly postcode: {
                                readonly type: "string";
                                readonly description: "Postal Codes, Zipcodes";
                                readonly examples: readonly ["45039"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly description: "Countries, Nation-states";
                                readonly examples: readonly ["United States of America"];
                            };
                            readonly country_code: {
                                readonly type: "string";
                                readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                readonly examples: readonly ["us"];
                            };
                        };
                    };
                    readonly boundingbox: {
                        readonly type: "array";
                        readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                };
                readonly required: readonly ["place_id", "licence", "lat", "lon", "display_name", "boundingbox"];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Nearest: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly profile: {
                    readonly type: "string";
                    readonly examples: readonly ["driving"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Mode of transportation. Only `driving` is supported at the moment. ";
                };
                readonly coordinates: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)";
                };
            };
            readonly required: readonly ["profile", "coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly bearings: {
                    readonly type: "string";
                    readonly examples: readonly ["10,20;40,30;30,9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`";
                };
                readonly radiuses: {
                    readonly type: "string";
                    readonly examples: readonly ["500;200;300"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)";
                };
                readonly hints: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`";
                };
                readonly number: {
                    readonly type: "integer";
                    readonly examples: readonly [3];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Number of nearest segments that should be returned. Accepted value: `integer >= 1` (default `1`) ";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Nearest";
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "If the request was successful `Ok` otherwise see the service dependent and general status codes.";
                };
                readonly waypoints: {
                    readonly type: "array";
                    readonly description: "Array of `Waypoint` objects sorted by distance to the input coordinate. ";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly nodes: {
                                readonly type: "array";
                                readonly description: "Array of OpenStreetMap node ids.";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Optimize: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly profile: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Mode of transportation. Only `driving` is supported at the moment. ";
                };
                readonly coordinates: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String of format `{longitude},{latitude};{longitude},{latitude}[;{longitude},{latitude} ...]` or `polyline({polyline}) or polyline6({polyline6})`. <br> You can send up to a maximum of `25` coordinate pairs per request (except `Nearest API` where `coordinates` only supports a single {longitude},{latitude} entry)";
                };
            };
            readonly required: readonly ["profile", "coordinates"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly bearings: {
                    readonly type: "string";
                    readonly examples: readonly ["10,20;40,30;30,9"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to segments with given bearing in degrees towards true north in clockwise direction. List of positive integer pairs separated by semi-colon and bearings array should be equal to length of coordinate array. Accepted Value :- `{bearing};{bearing}[;{bearing} ...]`\nEach `{bearing}` follows the following format: `{value},{range}` `integer 0 .. 360,integer 0 .. 180`";
                };
                readonly radiuses: {
                    readonly type: "string";
                    readonly examples: readonly ["500;200;300"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limits the search to given radius in meters Radiuses array length should be same as coordinates array, each value separated by semi-colon. Accepted Value - `{radius};{radius}[;{radius} ...]`\nEach `{radius}` has following format: `double >= 0` or `unlimited` (default)";
                };
                readonly hints: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Hint from previous request to derive position in street network. Accepted value: `{hint};{hint}[;{hint} ...]`";
                };
                readonly roundtrip: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route is a roundtrip (route returns to first location) . Accepted value: `true` (default), `false`";
                };
                readonly source: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route starts at `any` or `first` coordinate. Accepted value: `any` (default), `first`.";
                };
                readonly destination: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route ends at `any` or `last` coordinate. Accepted value: `any` (default), `last`.";
                };
                readonly steps: {
                    readonly type: "string";
                    readonly examples: readonly ["true"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route steps for each route leg.\nAccepted value:  `true`, `false` (default)";
                };
                readonly annotations: {
                    readonly type: "string";
                    readonly default: "false";
                    readonly examples: readonly ["false"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional metadata for each coordinate along the route geometry.\nAccepted value: `true`, `false` (default), `nodes`, `distance`, `duration`, `datasources`, `weight`, `speed`";
                };
                readonly geometries: {
                    readonly type: "string";
                    readonly default: "polyline";
                    readonly examples: readonly ["polyline"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returned route geometry format (influences overview and per step). Accepted value: `polyline` (default), `polyline6`, `geojson`";
                };
                readonly overview: {
                    readonly type: "string";
                    readonly default: "simplified";
                    readonly examples: readonly ["simplified"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Add overview geometry either full, simplified according to highest zoom level it could be display on, or not at all.\nAccepted value: `simplified` (default), `full`, `false`";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Directions";
            readonly type: "object";
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "string";
                    readonly waypoints: readonly [{
                        readonly distance: 0;
                        readonly location: readonly [0];
                    }];
                    readonly routes: readonly [];
                };
            };
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                    readonly description: "If the request was successful `Ok` otherwise see the service dependent and general status codes.";
                };
                readonly waypoints: {
                    readonly type: "array";
                    readonly description: "Object used to describe waypoint on a route.";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly hint: {
                                readonly type: "string";
                                readonly "x-stoplight": {
                                    readonly id: "to7sli9hdk2jt";
                                };
                                readonly description: "The distance, in meters, from the input coordinate to the snapped coordinate.";
                            };
                            readonly distance: {
                                readonly type: "number";
                                readonly description: "The distance, in meters, from the input coordinate to the snapped coordinate.";
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly "x-stoplight": {
                                    readonly id: "5vuo71t8c0zy4";
                                };
                                readonly description: "Unique internal identifier of the segment (ephemeral, not constant over data updates)\n   This can be used on subsequent request to significantly speed up the query and to connect multiple services.\n   E.g. you can use the `hint` value obtained by the `nearest` query as `hint` values for `route` inputs.";
                            };
                            readonly location: {
                                readonly type: "array";
                                readonly description: "Array that contains the `[longitude, latitude]` pair of the snapped coordinate.";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                        };
                    };
                };
                readonly routes: {
                    readonly title: "Routes";
                    readonly type: "array";
                    readonly description: "Represents a route through (potentially multiple) waypoints.";
                    readonly items: {
                        readonly title: "Route";
                        readonly type: "object";
                        readonly properties: {
                            readonly legs: {
                                readonly type: "array";
                                readonly description: "Represents a route between two waypoints.";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly steps: {
                                            readonly type: "array";
                                            readonly description: "A step consists of a maneuver such as a turn or merge, followed\nby a distance of travel along a single way to the subsequent\nstep.\n\nDepends on the `steps` parameter.\n\n| steps        |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | array of `RouteStep` objects describing the turn-by-turn instructions |\n| false        | empty array                                                           |";
                                            readonly items: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly intersections: {
                                                        readonly type: "object";
                                                        readonly description: "An intersection gives a full representation of any cross-way the path passes bay. For every step, the very first intersection (`intersections[0]`) corresponds to the\nlocation of the StepManeuver. Further intersections are listed for every cross-way until the next turn instruction.";
                                                        readonly properties: {
                                                            readonly location: {
                                                                readonly type: "array";
                                                                readonly description: "A `[longitude, latitude]` pair describing the location of the turn.";
                                                                readonly items: {
                                                                    readonly type: "number";
                                                                };
                                                            };
                                                            readonly in: {
                                                                readonly type: "number";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "lskt57vdr20n9";
                                                                };
                                                                readonly description: "index into bearings/entry array. Used to calculate the bearing just before the turn. Namely, the clockwise angle from true north to the\n  direction of travel immediately before the maneuver/passing the intersection. Bearings are given relative to the intersection. To get the bearing\n  in the direction of driving, the bearing has to be rotated by a value of 180. The value is not supplied for `depart` maneuvers.";
                                                            };
                                                            readonly out: {
                                                                readonly type: "number";
                                                                readonly description: "index into the bearings/entry array. Used to extract the bearing just after the turn. Namely, The clockwise angle from true north to the\n  direction of travel immediately after the maneuver/passing the intersection. The value is not supplied for `arrive` maneuvers.";
                                                            };
                                                            readonly bearings: {
                                                                readonly type: "number";
                                                                readonly description: "A list of bearing values (e.g. [0,90,180,270]) that are available at the intersection. The bearings describe all available roads at the intersection. Values are between 0-359 (0=true north)";
                                                            };
                                                            readonly entry: {
                                                                readonly type: "string";
                                                                readonly description: "A list of entry flags, corresponding in a 1:1 relationship to the bearings. A value of `true` indicates that the respective road could be entered on a valid route.\n  `false` indicates that the turn onto the respective road would violate a restriction.";
                                                            };
                                                            readonly classes: {
                                                                readonly type: "array";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "8eciacki4fjia";
                                                                };
                                                                readonly description: "An array of strings signifying the classes (as specified in the profile) of the road exiting the intersection.";
                                                                readonly items: {
                                                                    readonly "x-stoplight": {
                                                                        readonly id: "zl73uiawtykik";
                                                                    };
                                                                    readonly type: "string";
                                                                };
                                                            };
                                                            readonly lanes: {
                                                                readonly type: "array";
                                                                readonly "x-stoplight": {
                                                                    readonly id: "cbz5c1js7urfb";
                                                                };
                                                                readonly description: "A `Lane` represents a turn lane at the corresponding turn location.";
                                                                readonly items: {
                                                                    readonly "x-stoplight": {
                                                                        readonly id: "2belpw9ad3exo";
                                                                    };
                                                                    readonly type: "object";
                                                                    readonly properties: {
                                                                        readonly indications: {
                                                                            readonly type: "string";
                                                                            readonly "x-stoplight": {
                                                                                readonly id: "c4au3wfzuqkb3";
                                                                            };
                                                                            readonly description: "An indication (e.g. marking on the road) specifying the turn lane. A road can have multiple indications (e.g. an arrow pointing straight and left). The indications are given in an array, each containing one of the following types. Further indications might be added on without an API version change.\n\n| `value`                | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `none`                 | No dedicated indication is shown.                                                                                         |\n| `uturn`                | An indication signaling the possibility to reverse (i.e. fully bend arrow).                                               |\n| `sharp right`          | An indication indicating a sharp right turn (i.e. strongly bend arrow).                                                   |\n| `right`                | An indication indicating a right turn (i.e. bend arrow).                                                                  |\n| `slight right`         | An indication indicating a slight right turn (i.e. slightly bend arrow).                                                  |\n| `straight`             | No dedicated indication is shown (i.e. straight arrow).                                                                   |\n| `slight left`          | An indication indicating a slight left turn (i.e. slightly bend arrow).                                                   |\n| `left`                 | An indication indicating a left turn (i.e. bend arrow).                                                                   |\n| `sharp left`           | An indication indicating a sharp left turn (i.e. strongly bend arrow).                                                    |";
                                                                        };
                                                                        readonly valid: {
                                                                            readonly type: "string";
                                                                            readonly "x-stoplight": {
                                                                                readonly id: "rm2ay92cpk5dn";
                                                                            };
                                                                            readonly description: "A boolean flag (represented as `string`) indicating whether the lane is a valid choice in the current maneuver.";
                                                                        };
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    readonly driving_side: {
                                                        readonly type: "string";
                                                        readonly description: "The legal driving side at the location for this step. Either `left` or `right`.";
                                                    };
                                                    readonly geometry: {
                                                        readonly type: "string";
                                                        readonly description: "The unsimplified geometry of the route segment, depending on the `geometries` parameter.\n\n| `geometry` |                                                                    |\n|------------|--------------------------------------------------------------------|\n| polyline   | [polyline](https://www.npmjs.com/package/polyline) with precision 5 in [latitude,longitude] encoding |\n| polyline6  | [polyline](https://www.npmjs.com/package/polyline) with precision 6 in [latitude,longitude] encoding |\n| geojson    | [GeoJSON `LineString`](http://geojson.org/geojson-spec.html#linestring) |";
                                                    };
                                                    readonly duration: {
                                                        readonly type: "number";
                                                        readonly description: "The estimated travel time, in `float` number of seconds.";
                                                    };
                                                    readonly distance: {
                                                        readonly type: "number";
                                                        readonly description: "The distance of travel from the maneuver to the subsequent step, in `float` meters.";
                                                    };
                                                    readonly name: {
                                                        readonly type: "string";
                                                        readonly description: "The name of the way along which travel proceeds.";
                                                    };
                                                    readonly weight: {
                                                        readonly type: "number";
                                                        readonly description: "The calculated weight of the step.";
                                                    };
                                                    readonly mode: {
                                                        readonly type: "string";
                                                        readonly description: "A string signifying the mode of transportation.";
                                                    };
                                                    readonly maneuver: {
                                                        readonly type: "array";
                                                        readonly description: "A `StepManeuver` object representing the maneuver.";
                                                        readonly items: {
                                                            readonly type: "object";
                                                            readonly properties: {
                                                                readonly bearing_after: {
                                                                    readonly type: "number";
                                                                    readonly description: "The clockwise angle from true north to the\n  direction of travel immediately after the maneuver. Range 0-359.";
                                                                };
                                                                readonly location: {
                                                                    readonly type: "array";
                                                                    readonly description: "A `[longitude, latitude]` pair describing the location of the turn.";
                                                                    readonly items: {
                                                                        readonly type: "number";
                                                                    };
                                                                };
                                                                readonly type: {
                                                                    readonly type: "string";
                                                                    readonly description: "A string indicating the type of maneuver. **new identifiers might be introduced without API change**\n\n| `type`           | Description                                                  |\n|------------------|--------------------------------------------------------------|\n| `turn`           | a basic turn into direction of the `modifier`                |\n| `new name`       | no turn is taken/possible, but the road name changes. The road can take a turn itself, following `modifier`.                  |\n| `depart`         | indicates the departure of the leg                           |\n| `arrive`         | indicates the destination of the leg                         |\n| `merge`          | merge onto a street (e.g. getting on the highway from a ramp, the `modifier specifies the direction of the merge`) |\n| `ramp`           | **Deprecated**. Replaced by `on_ramp` and `off_ramp`.        |\n| `on ramp`        | take a ramp to enter a highway (direction given my `modifier`) |\n| `off ramp`       | take a ramp to exit a highway (direction given my `modifier`)  |\n| `fork`           | take the left/right side at a fork depending on `modifier`   |\n| `end of road`    | road ends in a T intersection turn in direction of `modifier`|\n| `use lane`       | **Deprecated** replaced by lanes on all intersection entries |\n| `continue`       | Turn in direction of `modifier` to stay on the same road     |\n| `roundabout`     | traverse roundabout, if the route leaves the roundabout there will be an additional property `exit` for exit counting. The modifier specifies the direction of entering the roundabout. |\n| `rotary`         | a traffic circle. While very similar to a larger version of a roundabout, it does not necessarily follow roundabout rules for right of way. It can offer `rotary_name` and/or `rotary_pronunciation` parameters (located in the RouteStep object) in addition to the `exit` parameter (located on the StepManeuver object).  |\n| `roundabout turn`| Describes a turn at a small roundabout that should be treated as normal turn. The `modifier` indicates the turn direction. Example instruction: `At the roundabout turn left`. |\n| `notification`   | not an actual turn but a change in the driving conditions. For example the travel mode or classes. If the road takes a turn itself, the `modifier` describes the direction |\n| `exit roundabout`| Describes a maneuver exiting a roundabout (usually preceded by a `roundabout` instruction) |\n| `exit rotary`    | Describes the maneuver exiting a rotary (large named roundabout) |";
                                                                };
                                                                readonly bearing_before: {
                                                                    readonly type: "number";
                                                                    readonly description: "he clockwise angle from true north to the\n  direction of travel immediately before the maneuver. Range 0-359.";
                                                                };
                                                                readonly modifier: {
                                                                    readonly type: "string";
                                                                    readonly description: "An optional `string` indicating the direction change of the maneuver.\n\n| `modifier`        | Description                               |\n|-------------------|-------------------------------------------|\n| `uturn`           | indicates  reversal of direction          |\n| `sharp right`     | a sharp right turn                        |\n| `right`           | a normal turn to the right                |\n| `slight right`    | a slight turn to the right                |\n| `straight`        | no relevant change in direction           |\n| `slight left`     | a slight turn to the left                 |\n| `left`            | a normal turn to the left                 |\n| `sharp left`      | a sharp turn to the left                  |\n\n The list of turns without a modifier is limited to: `depart/arrive`. If the source/target location is close enough to the `depart/arrive` location, no modifier will be given.\n\n  The meaning depends on the `type` property.\n\n| `type`                 | Description                                                                                                               |\n|------------------------|---------------------------------------------------------------------------------------------------------------------------|\n| `turn`                 | `modifier` indicates the change in direction accomplished through the turn                                                |\n| `depart`/`arrive`      | `modifier` indicates the position of departure point and arrival point in relation to the current direction of travel     |\n\n- `exit` An optional `integer` indicating number of the exit to take. The property exists for the `roundabout` / `rotary` property:\n  Number of the roundabout exit to take. If exit is `undefined` the destination is on the roundabout.\n\n\nNew properties (potentially depending on `type`) may be introduced in the future without an API version change.";
                                                                };
                                                                readonly ref: {
                                                                    readonly type: "string";
                                                                    readonly description: "A reference number or code for the way. Optionally included, if ref data is available for the given way.";
                                                                };
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                        readonly weight: {
                                            readonly type: "number";
                                            readonly description: "The calculated weight of the route leg.";
                                        };
                                        readonly distance: {
                                            readonly type: "number";
                                            readonly description: "The distance traveled by this route leg, in `float` meters.\n";
                                        };
                                        readonly annotations: {
                                            readonly type: "object";
                                            readonly description: "Additional details about each coordinate along the route geometry, with fine-grained information about each segment or node id.\n\n| annotations  |                                                                               |\n|--------------|-------------------------------------------------------------------------------|\n| true         | An `Annotation` object containing node ids, durations, distances and weights. |\n| false        | `undefined`                                                                   |\n";
                                            readonly properties: {
                                                readonly speed: {
                                                    readonly type: "array";
                                                    readonly description: "Convenience field, calculation of `distance / duration` rounded to one decimal place.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly metadata: {
                                                    readonly type: "object";
                                                    readonly description: "Metadata related to other annotations.";
                                                    readonly properties: {
                                                        readonly datasource_names: {
                                                            readonly type: "array";
                                                            readonly description: "The names of the datasources used for the speed between each pair of coordinates. `lua profile` is the default profile, other values are the filenames supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`.";
                                                            readonly items: {
                                                                readonly type: "string";
                                                            };
                                                        };
                                                    };
                                                };
                                                readonly nodes: {
                                                    readonly type: "array";
                                                    readonly description: "The OSM node ID for each coordinate along the route, excluding the first/last user-supplied coordinates.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly duration: {
                                                    readonly type: "array";
                                                    readonly description: "The duration between each pair of coordinates, in seconds. Does not include the duration of any turns.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly distance: {
                                                    readonly type: "array";
                                                    readonly description: "The distance, in meters, between each pair of coordinates.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly weight: {
                                                    readonly type: "array";
                                                    readonly description: "The weights between each pair of coordinates. Does not include any turn costs.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                                readonly datasources: {
                                                    readonly type: "array";
                                                    readonly description: "The index of the datasource for the speed between each pair of coordinates. `0` is the default profile, other values are supplied via `--segment-speed-file` to `osrm-contract` or `osrm-customize`. String-like names are in the `metadata.datasource_names` array.";
                                                    readonly items: {
                                                        readonly type: "number";
                                                    };
                                                };
                                            };
                                        };
                                        readonly summary: {
                                            readonly type: "string";
                                            readonly description: "Summary of the route taken as `string`. Depends on the `summary` parameter.\n\n| summary      |                                                                       |\n|--------------|-----------------------------------------------------------------------|\n| true         | Names of the two major roads used. Can be empty if route is too short.|\n| false        | empty `string`                                                        |";
                                        };
                                        readonly duration: {
                                            readonly type: "string";
                                            readonly description: "The estimated travel time, in `float` number of seconds.";
                                        };
                                    };
                                };
                            };
                            readonly weight_name: {
                                readonly type: "string";
                            };
                            readonly geometry: {
                                readonly type: "string";
                            };
                            readonly weight: {
                                readonly type: "number";
                            };
                            readonly distance: {
                                readonly type: "number";
                            };
                            readonly duration: {
                                readonly type: "number";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly "x-stoplight": {
                readonly id: "b9c442d5d14ed";
            };
            readonly type: "object";
            readonly properties: {
                readonly code: {
                    readonly type: "string";
                };
            };
            readonly "x-examples": {
                readonly "Example 1": {
                    readonly code: "Invalid key";
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Reverse: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [40.748442];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Latitude of the location to generate an address for.";
                };
                readonly lon: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly examples: readonly [-73.985658];
                    readonly minimum: -3.402823669209385e+38;
                    readonly maximum: 3.402823669209385e+38;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Longitude of the location to generate an address for.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly default: "xml";
                    readonly enum: readonly ["xml", "json", "xmlv1.1"];
                    readonly examples: readonly ["json"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output Format. Defaults to xml. \n\n> This version (v1) of our Reverse Geocoding API is compatible with OpenStreetMap's Nominatim Geocoder in both JSON & XML formats. However, all our enhancements such as additional datasets and algorithms are supported only in `json` or `xmlv1.1` format options.";
                };
                readonly zoom: {
                    readonly type: "integer";
                    readonly minimum: 0;
                    readonly maximum: 18;
                    readonly default: 18;
                    readonly examples: readonly [18];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Level of detail required where `0` is country and `18` is house/building. Defaults to `18`.\nIn terms of address details the zoom levels are as follows:\n\nzoom | address detail\n-----|---------------\n  3   | country\n  5   | state\n  8   | county\n  10  | city\n  14  | suburb\n  16  | street\n  18  | building";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly addressdetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a breakdown of the address of this result into elements. Important components include (but not limited to) country, postcode, state, county, city, town. Only those elements that are available for a given location will be returned.";
                };
                readonly normalizeaddress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly postaladdress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`.";
                };
                readonly oceans: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Allows you to specify whether or not the API should return the name of an ocean or sea if the coordinates provided fall within a body of water. By default, this parameter is set to `0` for backward compatibility. When set to `1` and used in conjunction with `addressdetails=1`, the response will contain a limited `address` section consisting of only the `name` and `water` elements, providing the name of the ocean or sea the coordinates correspond to, if the coordinates fall within a body of water.";
                };
                readonly showdistance: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns the straight line distance (meters) between the input location and the result's location. Value is set in the `distance` key of the response. Defaults to `0`.";
                };
                readonly statecode: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`.";
                };
                readonly source: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance.";
                };
                readonly namedetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`.";
                };
                readonly extratags: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`.";
                };
                readonly polygon_geojson: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in geojson format. Defaults to `0`.";
                };
                readonly polygon_kml: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in kml format. Defaults to `0`.";
                };
                readonly polygon_svg: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in svg format. Defaults to `0`.";
                };
                readonly polygon_text: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results as a WKT. Defaults to `0`.";
                };
                readonly polygon_threshold: {
                    readonly type: "number";
                    readonly default: 0;
                    readonly examples: readonly [0.2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.";
                };
            };
            readonly required: readonly ["lat", "lon"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-reverse-geocoding";
            readonly "x-stoplight": {
                readonly id: "7039d5df8864b";
            };
            readonly type: "object";
            readonly properties: {
                readonly place_id: {
                    readonly type: "string";
                    readonly description: "Unique identifier for the place.";
                    readonly examples: readonly ["223483692"];
                };
                readonly licence: {
                    readonly type: "string";
                    readonly description: "License information for the data.";
                    readonly examples: readonly ["© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0"];
                };
                readonly osm_type: {
                    readonly type: "string";
                    readonly description: "Type of OpenStreetMap object.";
                    readonly examples: readonly ["way"];
                };
                readonly osm_id: {
                    readonly type: "string";
                    readonly description: "Unique identifier for the OpenStreetMap object.";
                    readonly examples: readonly ["19301621"];
                };
                readonly lat: {
                    readonly type: "string";
                    readonly description: "Latitude of the location.";
                    readonly examples: readonly ["39.3074555677816"];
                };
                readonly lon: {
                    readonly type: "string";
                    readonly description: "Longitude of the location.";
                    readonly examples: readonly ["-84.2927748515948"];
                };
                readonly display_name: {
                    readonly type: "string";
                    readonly description: "Formatted address for display.";
                    readonly examples: readonly ["3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America"];
                };
                readonly address: {
                    readonly anyOf: readonly [{
                        readonly title: "address";
                        readonly type: "object";
                        readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                        readonly properties: {
                            readonly house_number: {
                                readonly type: "string";
                                readonly description: "House number";
                                readonly examples: readonly ["3894"];
                            };
                            readonly road: {
                                readonly type: "string";
                                readonly description: "Road name";
                                readonly examples: readonly ["Spring Mill Way"];
                            };
                            readonly neighbourhood: {
                                readonly type: "string";
                                readonly description: "Neighbourhood";
                            };
                            readonly hamlet: {
                                readonly type: "string";
                                readonly description: "Hamlet";
                            };
                            readonly suburb: {
                                readonly type: "string";
                                readonly description: "Suburb";
                            };
                            readonly village: {
                                readonly type: "string";
                                readonly description: "Village name";
                                readonly examples: readonly ["Landen"];
                            };
                            readonly town: {
                                readonly type: "string";
                                readonly description: "Town name";
                            };
                            readonly city_district: {
                                readonly type: "string";
                                readonly description: "Administrative area between city level and town level";
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly description: "City name";
                                readonly examples: readonly ["Landen"];
                            };
                            readonly region: {
                                readonly type: "string";
                                readonly description: "Region name";
                            };
                            readonly county: {
                                readonly type: "string";
                                readonly description: "County name";
                                readonly examples: readonly ["Warren County"];
                            };
                            readonly state_district: {
                                readonly type: "string";
                                readonly description: "District name";
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly description: "State name";
                                readonly examples: readonly ["Ohio"];
                            };
                            readonly state_code: {
                                readonly type: "string";
                                readonly description: "State code";
                                readonly examples: readonly ["oh"];
                            };
                            readonly postcode: {
                                readonly type: "string";
                                readonly description: "Postal code";
                                readonly examples: readonly ["45039"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly description: "Country name";
                                readonly examples: readonly ["United States of America"];
                            };
                            readonly country_code: {
                                readonly type: "string";
                                readonly description: "Country code";
                                readonly examples: readonly ["us"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Name of the entity/road in the given location";
                            };
                            readonly water: {
                                readonly type: "string";
                                readonly "x-stoplight": {
                                    readonly id: "7nunw3epqpcqo";
                                };
                                readonly description: "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions.";
                            };
                        };
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly house_number: "3894";
                                readonly road: "Spring Mill Way";
                                readonly residential: "Hunter’s Point";
                                readonly village: "Landen";
                                readonly city: "Landen";
                                readonly county: "Warren County";
                                readonly state: "Ohio";
                                readonly postcode: "45039";
                                readonly country: "United States of America";
                                readonly country_code: "us";
                                readonly state_code: "oh";
                            };
                            readonly "Result from Ocean": {
                                readonly house_number: "3894";
                                readonly road: "Spring Mill Way";
                                readonly residential: "Hunter’s Point";
                                readonly village: "Landen";
                                readonly city: "Landen";
                                readonly county: "Warren County";
                                readonly state: "Ohio";
                                readonly postcode: "45039";
                                readonly country: "United States of America";
                                readonly country_code: "us";
                                readonly state_code: "oh";
                            };
                            readonly "Example 2": {
                                readonly name: "South Pacific Ocean";
                                readonly water: "South Pacific Ocean";
                            };
                        };
                    }, {
                        readonly title: "address-normalized";
                        readonly "x-stoplight": {
                            readonly id: "q798lnglnqkb4";
                        };
                        readonly type: "object";
                        readonly description: "The default address section returns a wide range of elements - from common ones such as `road` and `country` to obscure ones such as `hamlet`, `cycleway`, `park`. This was done to maintain backward compatibility with OpenStreetMap's Nominatim. To make parsing easier for developers, the `normalizeaddress` parameter rolls up elements in the `address` section of the response to the list of elements defined below.\n";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "House name or Point of Interest (POI)";
                            };
                            readonly house_number: {
                                readonly type: "string";
                                readonly description: "House or Building number";
                                readonly examples: readonly ["3894"];
                            };
                            readonly road: {
                                readonly type: "string";
                                readonly description: "Roads, Highways, Freeways, Motorways";
                                readonly examples: readonly ["Spring Mill Way"];
                            };
                            readonly neighbourhood: {
                                readonly type: "string";
                                readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                            };
                            readonly suburb: {
                                readonly type: "string";
                                readonly description: "Suburbs, Subdivisions";
                            };
                            readonly island: {
                                readonly type: "string";
                                readonly description: "Islands, Islets";
                            };
                            readonly city: {
                                readonly type: "string";
                                readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                readonly examples: readonly ["Landen"];
                            };
                            readonly county: {
                                readonly type: "string";
                                readonly description: "Counties";
                                readonly examples: readonly ["Warren County"];
                            };
                            readonly state: {
                                readonly type: "string";
                                readonly description: "States, Provinces, Regions, State Districts";
                                readonly examples: readonly ["Ohio"];
                            };
                            readonly state_code: {
                                readonly type: "string";
                                readonly description: "State or Province Code";
                                readonly examples: readonly ["oh"];
                            };
                            readonly postcode: {
                                readonly type: "string";
                                readonly description: "Postal Codes, Zipcodes";
                                readonly examples: readonly ["45039"];
                            };
                            readonly country: {
                                readonly type: "string";
                                readonly description: "Countries, Nation-states";
                                readonly examples: readonly ["United States of America"];
                            };
                            readonly country_code: {
                                readonly type: "string";
                                readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                readonly examples: readonly ["us"];
                            };
                        };
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly house_number: "350";
                                readonly road: "5th Avenue";
                                readonly neighbourhood: "Manhattan Community Board 5";
                                readonly suburb: "Manhattan";
                                readonly city: "New York";
                                readonly county: "New York County";
                                readonly state: "New York";
                                readonly postcode: "10001";
                                readonly country: "United States of America";
                                readonly country_code: "us";
                            };
                            readonly "Result from Ocean": {
                                readonly name: "South Pacific Ocean";
                            };
                            readonly "Example 2": {
                                readonly name: "South Pacific Ocean";
                            };
                        };
                    }];
                };
                readonly boundingbox: {
                    readonly type: "array";
                    readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                    readonly items: {
                        readonly type: "string";
                        readonly examples: readonly ["39.307405567782"];
                    };
                };
                readonly distance: {
                    readonly type: "number";
                    readonly "x-examples": {
                        readonly "Example 1": 23;
                    };
                    readonly format: "double";
                    readonly description: "The straight line distance (meters) between the input location and the result's location. Returned when `showdistance=1` is set in the request.";
                    readonly minimum: -1.7976931348623157e+308;
                    readonly maximum: 1.7976931348623157e+308;
                };
                readonly namedetails: {
                    readonly type: "object";
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly name: "Empire State Building";
                            readonly "name:en": "Empire State Building";
                            readonly "name:es": "Edificio Empire State";
                            readonly "name:he": "בניין אמפייר סטייט";
                            readonly "name:hi": "एम्पायर स्टेट बिल्डिंग";
                            readonly "name:ko": "엠파이어 스테이트 빌딩";
                            readonly "name:ru": "Эмпайр-Стейт-Билдинг";
                            readonly "name:uk": "Емпайр-Стейт-Білдінг";
                            readonly "name:zh": "帝国大厦";
                        };
                    };
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                        };
                    };
                    readonly description: "The dictionary with full list of available names including ref etc. Returned when `namedetails=1` is set in the request.\n";
                };
                readonly extratags: {
                    readonly type: "object";
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly ele: "15";
                            readonly height: "443.2";
                            readonly wikidata: "Q9188";
                            readonly wikipedia: "en:Empire State Building";
                            readonly start_date: "1931";
                            readonly wheelchair: "yes";
                            readonly "building:use": "office";
                            readonly opening_hours: "Mo-Su 08:00-02:00";
                            readonly "building:levels": "102";
                            readonly construction_date: "1930-1931";
                        };
                    };
                    readonly description: "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n";
                    readonly additionalProperties: true;
                };
                readonly geojson: {
                    readonly type: "object";
                    readonly properties: {
                        readonly type: {
                            readonly type: "string";
                            readonly examples: readonly ["house"];
                        };
                        readonly coordinates: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "number";
                            };
                        };
                    };
                    readonly "x-examples": {
                        readonly "Example 1": {
                            readonly type: "Polygon";
                            readonly coordinates: readonly [readonly [readonly [-73.9865012, 40.748491], readonly [-73.9851602, 40.7479255], readonly [-73.9848166, 40.7483931], readonly [-73.9861574, 40.7489585], readonly [-73.9863252, 40.7487301], readonly [-73.9863554, 40.748689], readonly [-73.9864839, 40.7485145], readonly [-73.9865012, 40.748491]]];
                        };
                    };
                    readonly description: "Output geometry of results in geojson format. Returned when `polygon_geojson=1` is set in the request.";
                };
                readonly geokml: {
                    readonly type: "string";
                    readonly "x-examples": {
                        readonly "Example 1": "<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.986501200000006,40.748491000000001 -73.985160199999996,40.747925500000001 -73.984816600000002,40.748393100000001 -73.986157399999996,40.748958500000001 -73.986325199999996,40.748730100000003 -73.986355399999994,40.748688999999999 -73.986483899999996,40.748514499999999 -73.986501200000006,40.748491000000001</coordinates></LinearRing></outerBoundaryIs></Polygon>";
                    };
                    readonly description: "Output geometry of results in kml format. Returned when `polygon_kml=1` is set in the request.";
                };
                readonly svg: {
                    readonly type: "string";
                    readonly "x-examples": {
                        readonly "Example 1": "M -73.9865012 -40.748491 L -73.9851602 -40.7479255 -73.9848166 -40.7483931 -73.9861574 -40.7489585 -73.9863252 -40.7487301 -73.9863554 -40.748689 -73.9864839 -40.7485145 Z";
                    };
                    readonly description: "Output geometry of results in svg format. Returned when `polygon_svg=1` is set in the request.";
                };
                readonly geotext: {
                    readonly type: "string";
                    readonly "x-examples": {
                        readonly "Example 1": "POLYGON((-73.9865012 40.748491,-73.9851602 40.7479255,-73.9848166 40.7483931,-73.9861574 40.7489585,-73.9863252 40.7487301,-73.9863554 40.748689,-73.9864839 40.7485145,-73.9865012 40.748491))";
                    };
                    readonly title: "";
                    readonly description: "Output geometry of results as a WKT. Returned when `polygon_text=1` is set in the request.";
                };
                readonly postaladdress: {
                    readonly title: "postaladdress";
                    readonly "x-stoplight": {
                        readonly id: "zq4zgnef9uq9n";
                    };
                    readonly type: "string";
                    readonly description: "Returns address specifically formatted for each country. Returned when `postaladdress` is set in the request";
                    readonly "x-examples": {
                        readonly "Example 1": "5, Avenue Anatole France, 75007, Paris, France";
                    };
                };
            };
            readonly required: readonly ["place_id", "licence", "lat", "lon", "display_name", "boundingbox"];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const Search: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly q: {
                    readonly type: "string";
                    readonly examples: readonly ["Empire State Building"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Free-form query string to search for. Commas are optional, but improves performance by reducing the complexity of the search.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly default: "xml";
                    readonly enum: readonly ["xml", "json", "xmlv1.1"];
                    readonly examples: readonly ["json"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output Format. Defaults to xml. \n\n> This version (v1) of our Reverse Geocoding API is compatible with OpenStreetMap's Nominatim Geocoder in both JSON & XML formats. However, all our enhancements such as additional datasets and algorithms are supported only in `json` or `xmlv1.1` format options.";
                };
                readonly addressdetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a breakdown of the address of this result into elements. Defaults to `0`.";
                };
                readonly statecode: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`.";
                };
                readonly viewbox: {
                    readonly type: "string";
                    readonly examples: readonly ["-73.9965012,40.7489255,-73.9858166,40.7499585"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The preferred area to find search results. Any two corner points of the box - `max_lon,max_lat,min_lon,min_lat` or `min_lon,min_lat,max_lon,max_lat` - are accepted in any order as long as they span a real box. To restrict results to those within the viewbox, use along with the `bounded` option.";
                };
                readonly bounded: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Restrict result to items contained within the bounds specified in the `viewbox` parameter. Defaults to `0`.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`.";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly countrycodes: {
                    readonly type: "string";
                    readonly examples: readonly ["us,ca,gb"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s).";
                };
                readonly normalizeaddress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly postaladdress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`.";
                };
                readonly matchquality: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional information about quality of the result in a `matchquality` object. Defaults to `0`.";
                };
                readonly source: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance.";
                };
                readonly normalizeimportance: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When this parameter is absent or set to `1`, the `importance` value(s) in the API response is limited to the range of 0 to 1. Values outside this range are adjusted to the nearest boundary (0 or 1). Setting `normalizeimportance` to `0` allows the importance value to be lower or higher than the specified range of 0 to 1. Defaults to `1`";
                };
                readonly dedupe: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `1`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested.";
                };
                readonly namedetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`.";
                };
                readonly extratags: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`.";
                };
                readonly polygon_geojson: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in geojson format. Defaults to `0`.";
                };
                readonly polygon_kml: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in kml format. Defaults to `0`.";
                };
                readonly polygon_svg: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in svg format. Defaults to `0`.";
                };
                readonly polygon_text: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results as a WKT. Defaults to `0`.";
                };
                readonly json_callback: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats.";
                };
                readonly polygon_threshold: {
                    readonly type: "number";
                    readonly default: 0;
                    readonly examples: readonly [0.2];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When one of the polygon_* outputs is chosen, return a simplified version of the output geometry. The parameter describes the tolerance in degrees with which the geometry may differ from the original geometry. Topology is preserved in the geometry.";
                };
            };
            readonly required: readonly ["q"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-forward-geocoding";
            readonly "x-stoplight": {
                readonly id: "360vfacsuwhfx";
            };
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly place_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the place.";
                    };
                    readonly licence: {
                        readonly type: "string";
                        readonly description: "License information for the data.";
                    };
                    readonly osm_type: {
                        readonly type: "string";
                        readonly description: "Type of OpenStreetMap object.";
                    };
                    readonly osm_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the OpenStreetMap object.";
                    };
                    readonly lat: {
                        readonly type: "string";
                        readonly description: "Latitude of the location.";
                    };
                    readonly lon: {
                        readonly type: "string";
                        readonly description: "Longitude of the location.";
                    };
                    readonly display_name: {
                        readonly type: "string";
                        readonly description: "Formatted address for display.";
                    };
                    readonly class: {
                        readonly type: "string";
                        readonly description: "The category of this result";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The 'type' of the class/category of this result";
                    };
                    readonly importance: {
                        readonly type: "number";
                        readonly description: "Calculated importance of this result compared to the search query the user has provided. Ranges between 0 and 1.";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly address: {
                        readonly anyOf: readonly [{
                            readonly title: "address";
                            readonly type: "object";
                            readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                            readonly properties: {
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Road name";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhood";
                                };
                                readonly hamlet: {
                                    readonly type: "string";
                                    readonly description: "Hamlet";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburb";
                                };
                                readonly village: {
                                    readonly type: "string";
                                    readonly description: "Village name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly town: {
                                    readonly type: "string";
                                    readonly description: "Town name";
                                };
                                readonly city_district: {
                                    readonly type: "string";
                                    readonly description: "Administrative area between city level and town level";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "City name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly region: {
                                    readonly type: "string";
                                    readonly description: "Region name";
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "County name";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state_district: {
                                    readonly type: "string";
                                    readonly description: "District name";
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "State name";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal code";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Country name";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country code";
                                    readonly examples: readonly ["us"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Name of the entity/road in the given location";
                                };
                                readonly water: {
                                    readonly type: "string";
                                    readonly "x-stoplight": {
                                        readonly id: "7nunw3epqpcqo";
                                    };
                                    readonly description: "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions.";
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Result from Ocean": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                    readonly water: "South Pacific Ocean";
                                };
                            };
                        }, {
                            readonly title: "address-normalized";
                            readonly "x-stoplight": {
                                readonly id: "q798lnglnqkb4";
                            };
                            readonly type: "object";
                            readonly description: "The default address section returns a wide range of elements - from common ones such as `road` and `country` to obscure ones such as `hamlet`, `cycleway`, `park`. This was done to maintain backward compatibility with OpenStreetMap's Nominatim. To make parsing easier for developers, the `normalizeaddress` parameter rolls up elements in the `address` section of the response to the list of elements defined below.\n";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "House name or Point of Interest (POI)";
                                };
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House or Building number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Roads, Highways, Freeways, Motorways";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburbs, Subdivisions";
                                };
                                readonly island: {
                                    readonly type: "string";
                                    readonly description: "Islands, Islets";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "Counties";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "States, Provinces, Regions, State Districts";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State or Province Code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal Codes, Zipcodes";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Countries, Nation-states";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                    readonly examples: readonly ["us"];
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly name: "Empire State Building";
                                    readonly house_number: "350";
                                    readonly road: "5th Avenue";
                                    readonly neighbourhood: "Manhattan Community Board 5";
                                    readonly suburb: "Manhattan";
                                    readonly city: "New York";
                                    readonly county: "New York County";
                                    readonly state: "New York";
                                    readonly postcode: "10001";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                };
                                readonly "Result from Ocean": {
                                    readonly name: "South Pacific Ocean";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                };
                            };
                        }];
                    };
                    readonly boundingbox: {
                        readonly type: "array";
                        readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly namedetails: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly "name:en": "Empire State Building";
                                readonly "name:es": "Edificio Empire State";
                                readonly "name:he": "בניין אמפייר סטייט";
                                readonly "name:hi": "एम्पायर स्टेट बिल्डिंग";
                                readonly "name:ko": "엠파이어 스테이트 빌딩";
                                readonly "name:ru": "Эмпайр-Стейт-Билдинг";
                                readonly "name:uk": "Емпайр-Стейт-Білдінг";
                                readonly "name:zh": "帝国大厦";
                            };
                        };
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                        readonly description: "The dictionary with full list of available names including ref etc. Returned when `namedetails=1` is set in the request.\n";
                    };
                    readonly extratags: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly ele: "15";
                                readonly height: "443.2";
                                readonly wikidata: "Q9188";
                                readonly wikipedia: "en:Empire State Building";
                                readonly start_date: "1931";
                                readonly wheelchair: "yes";
                                readonly "building:use": "office";
                                readonly opening_hours: "Mo-Su 08:00-02:00";
                                readonly "building:levels": "102";
                                readonly construction_date: "1930-1931";
                            };
                        };
                        readonly description: "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n";
                        readonly additionalProperties: true;
                    };
                    readonly geojson: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                            };
                            readonly coordinates: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                        };
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly type: "Polygon";
                                readonly coordinates: readonly [readonly [readonly [-73.9865012, 40.748491], readonly [-73.9851602, 40.7479255], readonly [-73.9848166, 40.7483931], readonly [-73.9861574, 40.7489585], readonly [-73.9863252, 40.7487301], readonly [-73.9863554, 40.748689], readonly [-73.9864839, 40.7485145], readonly [-73.9865012, 40.748491]]];
                            };
                        };
                        readonly description: "Output geometry of results in geojson format. Returned when `polygon_geojson=1` is set in the request.";
                    };
                    readonly geokml: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.986501200000006,40.748491000000001 -73.985160199999996,40.747925500000001 -73.984816600000002,40.748393100000001 -73.986157399999996,40.748958500000001 -73.986325199999996,40.748730100000003 -73.986355399999994,40.748688999999999 -73.986483899999996,40.748514499999999 -73.986501200000006,40.748491000000001</coordinates></LinearRing></outerBoundaryIs></Polygon>";
                        };
                        readonly description: "Output geometry of results in kml format. Returned when `polygon_kml=1` is set in the request.";
                    };
                    readonly svg: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "M -73.9865012 -40.748491 L -73.9851602 -40.7479255 -73.9848166 -40.7483931 -73.9861574 -40.7489585 -73.9863252 -40.7487301 -73.9863554 -40.748689 -73.9864839 -40.7485145 Z";
                        };
                        readonly description: "Output geometry of results in svg format. Returned when `polygon_svg=1` is set in the request.";
                    };
                    readonly geotext: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "POLYGON((-73.9865012 40.748491,-73.9851602 40.7479255,-73.9848166 40.7483931,-73.9861574 40.7489585,-73.9863252 40.7487301,-73.9863554 40.748689,-73.9864839 40.7485145,-73.9865012 40.748491))";
                        };
                        readonly title: "";
                        readonly description: "Output geometry of results as a WKT. Returned when `polygon_text=1` is set in the request.";
                    };
                    readonly icon: {
                        readonly type: "string";
                        readonly "x-stoplight": {
                            readonly id: "udpck9wsvlgou";
                        };
                        readonly description: "The URL of an icon representing this result, if applicable.";
                    };
                    readonly matchquality: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly matchcode: "exact";
                                readonly matchtype: "point";
                                readonly matchlevel: "venue";
                            };
                        };
                        readonly description: "An additional object `matchquality` for every result in the response, containing the following elements: `matchcode`, `matchtype`, `matchlevel`.";
                        readonly properties: {
                            readonly matchcode: {
                                readonly title: "matchcode";
                                readonly "x-stoplight": {
                                    readonly id: "keiun4kwm07z4";
                                };
                                readonly type: "string";
                                readonly description: "Specifies the quality of the returned address.\n\n matchcode  | description\n ------------|---------------\n  exact      | The result matches the input query with a high level of probability.\n  fallback   | The result does not exactly match the input but is closely related to it provided there is direct a heierarchial relation.\n  approximate| The result matches the input query with a medium to low level of probability.\n";
                            };
                            readonly matchtype: {
                                readonly title: "matchtype";
                                readonly "x-stoplight": {
                                    readonly id: "20ejxqp1iy2wr";
                                };
                                readonly type: "string";
                                readonly description: "Specifies quality of the returned location match\n  \n  matchtype    | description\n --------------|---------------\n  point        | The coordinate returned is a point address, typically with rooftop accuracy.\n  centroid     | The coordinate returned is a centroid of a road or administrative boundary.\n  interpolated | The coordinate returned is a point determined by interpolation.";
                            };
                            readonly matchlevel: {
                                readonly type: "string";
                                readonly "x-examples": {
                                    readonly "Example 1": "venue";
                                };
                                readonly description: "Specifies the most granular address element that matches the geocoding query.\n\n matchlevel       | details\n -----------------|---------------\n  venue           | The returned address is of a Point of Interest (PoI) level.\n  building        | The returned address is of a house level.\n  street          | The returned address is on a street level.\n  neighbourhood   | The returned address is on a neighbourhood level.\n  island          | The returned address is on a island level.\n  borough         | The returned address is on a borough level.\n  city            | The returned address is on a city level.\n  county          | The returned address is on a county level.\n  state           | The returned address is on a state level.\n  country         | The returned address is on a country level.\n  marine          | The returned address is on a marine level.\n  postalcode      | The returned address is on a postalcode level.";
                            };
                        };
                    };
                    readonly postaladdress: {
                        readonly title: "postaladdress";
                        readonly "x-stoplight": {
                            readonly id: "zq4zgnef9uq9n";
                        };
                        readonly type: "string";
                        readonly description: "Returns address specifically formatted for each country. Returned when `postaladdress` is set in the request";
                        readonly "x-examples": {
                            readonly "Example 1": "5, Avenue Anatole France, 75007, Paris, France";
                        };
                    };
                };
                readonly required: readonly ["place_id", "licence", "lat", "lon", "display_name", "boundingbox"];
            };
            readonly description: "";
            readonly "x-examples": {
                readonly "Example 1": readonly [{
                    readonly place_id: "223483692";
                    readonly licence: "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0";
                    readonly osm_type: "way";
                    readonly osm_id: "19301621";
                    readonly boundingbox: readonly ["39.307405567782", "39.307505567782", "-84.292824851595", "-84.292724851595"];
                    readonly lat: "39.3074555677816";
                    readonly lon: "-84.2927748515948";
                    readonly display_name: "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America";
                    readonly class: "place";
                    readonly type: "house";
                    readonly importance: 0.62025;
                    readonly address: {
                        readonly name: "Empire State Building";
                        readonly house_number: "3894";
                        readonly road: "Spring Mill Way";
                        readonly residential: "Hunter’s Point";
                        readonly village: "Landen";
                        readonly county: "Warren County";
                        readonly state: "Ohio";
                        readonly postcode: "45039";
                        readonly country: "United States of America";
                        readonly country_code: "us";
                        readonly city: "Landen";
                    };
                }];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SearchPostalcode: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly postalcode: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Use this to indicate the postal or ZIP code, aiding in pinpointing the exact area within a city or locality.";
                };
                readonly countrycodes: {
                    readonly type: "string";
                    readonly examples: readonly ["us,ca,gb"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s).";
                };
                readonly format: {
                    readonly type: "string";
                    readonly default: "xml";
                    readonly enum: readonly ["xml", "json", "xmlv1.1"];
                    readonly examples: readonly ["json"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output Format. Defaults to xml. \n\n> This version (v1) of our Reverse Geocoding API is compatible with OpenStreetMap's Nominatim Geocoder in both JSON & XML formats. However, all our enhancements such as additional datasets and algorithms are supported only in `json` or `xmlv1.1` format options.";
                };
                readonly addressdetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a breakdown of the address of this result into elements. Defaults to `0`.";
                };
                readonly statecode: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`.";
                };
                readonly viewbox: {
                    readonly type: "string";
                    readonly examples: readonly ["-73.9965012,40.7489255,-73.9858166,40.7499585"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The preferred area to find search results. Any two corner points of the box - `max_lon,max_lat,min_lon,min_lat` or `min_lon,min_lat,max_lon,max_lat` - are accepted in any order as long as they span a real box. To restrict results to those within the viewbox, use along with the `bounded` option.";
                };
                readonly bounded: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Restrict result to items contained within the bounds specified in the `viewbox` parameter. Defaults to `0`.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`.";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly normalizeaddress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly postaladdress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`.";
                };
                readonly matchquality: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional information about quality of the result in a `matchquality` object. Defaults to `0`.";
                };
                readonly source: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance.";
                };
                readonly normalizeimportance: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When this parameter is absent or set to `1`, the `importance` value(s) in the API response is limited to the range of 0 to 1. Values outside this range are adjusted to the nearest boundary (0 or 1). Setting `normalizeimportance` to `0` allows the importance value to be lower or higher than the specified range of 0 to 1. Defaults to `1`";
                };
                readonly dedupe: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `1`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested.";
                };
                readonly namedetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`.";
                };
                readonly extratags: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`.";
                };
                readonly polygon_geojson: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in geojson format. Defaults to `0`.";
                };
                readonly polygon_kml: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in kml format. Defaults to `0`.";
                };
                readonly polygon_svg: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in svg format. Defaults to `0`.";
                };
                readonly polygon_text: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results as a WKT. Defaults to `0`.";
                };
                readonly json_callback: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats.";
                };
            };
            readonly required: readonly ["postalcode"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-forward-geocoding";
            readonly "x-stoplight": {
                readonly id: "360vfacsuwhfx";
            };
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly place_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the place.";
                    };
                    readonly licence: {
                        readonly type: "string";
                        readonly description: "License information for the data.";
                    };
                    readonly osm_type: {
                        readonly type: "string";
                        readonly description: "Type of OpenStreetMap object.";
                    };
                    readonly osm_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the OpenStreetMap object.";
                    };
                    readonly lat: {
                        readonly type: "string";
                        readonly description: "Latitude of the location.";
                    };
                    readonly lon: {
                        readonly type: "string";
                        readonly description: "Longitude of the location.";
                    };
                    readonly display_name: {
                        readonly type: "string";
                        readonly description: "Formatted address for display.";
                    };
                    readonly class: {
                        readonly type: "string";
                        readonly description: "The category of this result";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The 'type' of the class/category of this result";
                    };
                    readonly importance: {
                        readonly type: "number";
                        readonly description: "Calculated importance of this result compared to the search query the user has provided. Ranges between 0 and 1.";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly address: {
                        readonly anyOf: readonly [{
                            readonly title: "address";
                            readonly type: "object";
                            readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                            readonly properties: {
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Road name";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhood";
                                };
                                readonly hamlet: {
                                    readonly type: "string";
                                    readonly description: "Hamlet";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburb";
                                };
                                readonly village: {
                                    readonly type: "string";
                                    readonly description: "Village name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly town: {
                                    readonly type: "string";
                                    readonly description: "Town name";
                                };
                                readonly city_district: {
                                    readonly type: "string";
                                    readonly description: "Administrative area between city level and town level";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "City name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly region: {
                                    readonly type: "string";
                                    readonly description: "Region name";
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "County name";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state_district: {
                                    readonly type: "string";
                                    readonly description: "District name";
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "State name";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal code";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Country name";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country code";
                                    readonly examples: readonly ["us"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Name of the entity/road in the given location";
                                };
                                readonly water: {
                                    readonly type: "string";
                                    readonly "x-stoplight": {
                                        readonly id: "7nunw3epqpcqo";
                                    };
                                    readonly description: "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions.";
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Result from Ocean": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                    readonly water: "South Pacific Ocean";
                                };
                            };
                        }, {
                            readonly title: "address-normalized";
                            readonly "x-stoplight": {
                                readonly id: "q798lnglnqkb4";
                            };
                            readonly type: "object";
                            readonly description: "The default address section returns a wide range of elements - from common ones such as `road` and `country` to obscure ones such as `hamlet`, `cycleway`, `park`. This was done to maintain backward compatibility with OpenStreetMap's Nominatim. To make parsing easier for developers, the `normalizeaddress` parameter rolls up elements in the `address` section of the response to the list of elements defined below.\n";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "House name or Point of Interest (POI)";
                                };
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House or Building number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Roads, Highways, Freeways, Motorways";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburbs, Subdivisions";
                                };
                                readonly island: {
                                    readonly type: "string";
                                    readonly description: "Islands, Islets";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "Counties";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "States, Provinces, Regions, State Districts";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State or Province Code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal Codes, Zipcodes";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Countries, Nation-states";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                    readonly examples: readonly ["us"];
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly name: "Empire State Building";
                                    readonly house_number: "350";
                                    readonly road: "5th Avenue";
                                    readonly neighbourhood: "Manhattan Community Board 5";
                                    readonly suburb: "Manhattan";
                                    readonly city: "New York";
                                    readonly county: "New York County";
                                    readonly state: "New York";
                                    readonly postcode: "10001";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                };
                                readonly "Result from Ocean": {
                                    readonly name: "South Pacific Ocean";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                };
                            };
                        }];
                    };
                    readonly boundingbox: {
                        readonly type: "array";
                        readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly namedetails: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly "name:en": "Empire State Building";
                                readonly "name:es": "Edificio Empire State";
                                readonly "name:he": "בניין אמפייר סטייט";
                                readonly "name:hi": "एम्पायर स्टेट बिल्डिंग";
                                readonly "name:ko": "엠파이어 스테이트 빌딩";
                                readonly "name:ru": "Эмпайр-Стейт-Билдинг";
                                readonly "name:uk": "Емпайр-Стейт-Білдінг";
                                readonly "name:zh": "帝国大厦";
                            };
                        };
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                        readonly description: "The dictionary with full list of available names including ref etc. Returned when `namedetails=1` is set in the request.\n";
                    };
                    readonly extratags: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly ele: "15";
                                readonly height: "443.2";
                                readonly wikidata: "Q9188";
                                readonly wikipedia: "en:Empire State Building";
                                readonly start_date: "1931";
                                readonly wheelchair: "yes";
                                readonly "building:use": "office";
                                readonly opening_hours: "Mo-Su 08:00-02:00";
                                readonly "building:levels": "102";
                                readonly construction_date: "1930-1931";
                            };
                        };
                        readonly description: "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n";
                        readonly additionalProperties: true;
                    };
                    readonly geojson: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                            };
                            readonly coordinates: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                        };
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly type: "Polygon";
                                readonly coordinates: readonly [readonly [readonly [-73.9865012, 40.748491], readonly [-73.9851602, 40.7479255], readonly [-73.9848166, 40.7483931], readonly [-73.9861574, 40.7489585], readonly [-73.9863252, 40.7487301], readonly [-73.9863554, 40.748689], readonly [-73.9864839, 40.7485145], readonly [-73.9865012, 40.748491]]];
                            };
                        };
                        readonly description: "Output geometry of results in geojson format. Returned when `polygon_geojson=1` is set in the request.";
                    };
                    readonly geokml: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.986501200000006,40.748491000000001 -73.985160199999996,40.747925500000001 -73.984816600000002,40.748393100000001 -73.986157399999996,40.748958500000001 -73.986325199999996,40.748730100000003 -73.986355399999994,40.748688999999999 -73.986483899999996,40.748514499999999 -73.986501200000006,40.748491000000001</coordinates></LinearRing></outerBoundaryIs></Polygon>";
                        };
                        readonly description: "Output geometry of results in kml format. Returned when `polygon_kml=1` is set in the request.";
                    };
                    readonly svg: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "M -73.9865012 -40.748491 L -73.9851602 -40.7479255 -73.9848166 -40.7483931 -73.9861574 -40.7489585 -73.9863252 -40.7487301 -73.9863554 -40.748689 -73.9864839 -40.7485145 Z";
                        };
                        readonly description: "Output geometry of results in svg format. Returned when `polygon_svg=1` is set in the request.";
                    };
                    readonly geotext: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "POLYGON((-73.9865012 40.748491,-73.9851602 40.7479255,-73.9848166 40.7483931,-73.9861574 40.7489585,-73.9863252 40.7487301,-73.9863554 40.748689,-73.9864839 40.7485145,-73.9865012 40.748491))";
                        };
                        readonly title: "";
                        readonly description: "Output geometry of results as a WKT. Returned when `polygon_text=1` is set in the request.";
                    };
                    readonly icon: {
                        readonly type: "string";
                        readonly "x-stoplight": {
                            readonly id: "udpck9wsvlgou";
                        };
                        readonly description: "The URL of an icon representing this result, if applicable.";
                    };
                    readonly matchquality: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly matchcode: "exact";
                                readonly matchtype: "point";
                                readonly matchlevel: "venue";
                            };
                        };
                        readonly description: "An additional object `matchquality` for every result in the response, containing the following elements: `matchcode`, `matchtype`, `matchlevel`.";
                        readonly properties: {
                            readonly matchcode: {
                                readonly title: "matchcode";
                                readonly "x-stoplight": {
                                    readonly id: "keiun4kwm07z4";
                                };
                                readonly type: "string";
                                readonly description: "Specifies the quality of the returned address.\n\n matchcode  | description\n ------------|---------------\n  exact      | The result matches the input query with a high level of probability.\n  fallback   | The result does not exactly match the input but is closely related to it provided there is direct a heierarchial relation.\n  approximate| The result matches the input query with a medium to low level of probability.\n";
                            };
                            readonly matchtype: {
                                readonly title: "matchtype";
                                readonly "x-stoplight": {
                                    readonly id: "20ejxqp1iy2wr";
                                };
                                readonly type: "string";
                                readonly description: "Specifies quality of the returned location match\n  \n  matchtype    | description\n --------------|---------------\n  point        | The coordinate returned is a point address, typically with rooftop accuracy.\n  centroid     | The coordinate returned is a centroid of a road or administrative boundary.\n  interpolated | The coordinate returned is a point determined by interpolation.";
                            };
                            readonly matchlevel: {
                                readonly type: "string";
                                readonly "x-examples": {
                                    readonly "Example 1": "venue";
                                };
                                readonly description: "Specifies the most granular address element that matches the geocoding query.\n\n matchlevel       | details\n -----------------|---------------\n  venue           | The returned address is of a Point of Interest (PoI) level.\n  building        | The returned address is of a house level.\n  street          | The returned address is on a street level.\n  neighbourhood   | The returned address is on a neighbourhood level.\n  island          | The returned address is on a island level.\n  borough         | The returned address is on a borough level.\n  city            | The returned address is on a city level.\n  county          | The returned address is on a county level.\n  state           | The returned address is on a state level.\n  country         | The returned address is on a country level.\n  marine          | The returned address is on a marine level.\n  postalcode      | The returned address is on a postalcode level.";
                            };
                        };
                    };
                    readonly postaladdress: {
                        readonly title: "postaladdress";
                        readonly "x-stoplight": {
                            readonly id: "zq4zgnef9uq9n";
                        };
                        readonly type: "string";
                        readonly description: "Returns address specifically formatted for each country. Returned when `postaladdress` is set in the request";
                        readonly "x-examples": {
                            readonly "Example 1": "5, Avenue Anatole France, 75007, Paris, France";
                        };
                    };
                };
                readonly required: readonly ["place_id", "licence", "lat", "lon", "display_name", "boundingbox"];
            };
            readonly description: "";
            readonly "x-examples": {
                readonly "Example 1": readonly [{
                    readonly place_id: "223483692";
                    readonly licence: "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0";
                    readonly osm_type: "way";
                    readonly osm_id: "19301621";
                    readonly boundingbox: readonly ["39.307405567782", "39.307505567782", "-84.292824851595", "-84.292724851595"];
                    readonly lat: "39.3074555677816";
                    readonly lon: "-84.2927748515948";
                    readonly display_name: "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America";
                    readonly class: "place";
                    readonly type: "house";
                    readonly importance: 0.62025;
                    readonly address: {
                        readonly name: "Empire State Building";
                        readonly house_number: "3894";
                        readonly road: "Spring Mill Way";
                        readonly residential: "Hunter’s Point";
                        readonly village: "Landen";
                        readonly county: "Warren County";
                        readonly state: "Ohio";
                        readonly postcode: "45039";
                        readonly country: "United States of America";
                        readonly country_code: "us";
                        readonly city: "Landen";
                    };
                }];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const SearchStructured: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly street: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Pass this parameter to specify the street address (building number, name and road).";
                };
                readonly city: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include this parameter to provide the city information for geocoding.";
                };
                readonly county: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Use this to indicate the county or administrative region of the address.";
                };
                readonly state: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Pass this to specify the state or province of the address, helping to identify the region within the country.";
                };
                readonly country: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: " Include this to provide country of the address, crucial for precise geocoding on a global scale.";
                };
                readonly postalcode: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Use this to indicate the postal or ZIP code, aiding in pinpointing the exact area within a city or locality.";
                };
                readonly format: {
                    readonly type: "string";
                    readonly default: "xml";
                    readonly enum: readonly ["xml", "json", "xmlv1.1"];
                    readonly examples: readonly ["json"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output Format. Defaults to xml. \n\n> This version (v1) of our Reverse Geocoding API is compatible with OpenStreetMap's Nominatim Geocoder in both JSON & XML formats. However, all our enhancements such as additional datasets and algorithms are supported only in `json` or `xmlv1.1` format options.";
                };
                readonly addressdetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a breakdown of the address of this result into elements. Defaults to `0`.";
                };
                readonly statecode: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Adds state or province code when available to the `state_code` key inside the `address` object. Currently supported for addresses in the USA, Canada and Australia. Defaults to `0`.";
                };
                readonly viewbox: {
                    readonly type: "string";
                    readonly examples: readonly ["-73.9965012,40.7489255,-73.9858166,40.7499585"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "The preferred area to find search results. Any two corner points of the box - `max_lon,max_lat,min_lon,min_lat` or `min_lon,min_lat,max_lon,max_lat` - are accepted in any order as long as they span a real box. To restrict results to those within the viewbox, use along with the `bounded` option.";
                };
                readonly bounded: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Restrict result to items contained within the bounds specified in the `viewbox` parameter. Defaults to `0`.";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 50;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit the number of returned results. Accepted value: `1` to `50`. Defaults to `10`.";
                };
                readonly "accept-language": {
                    readonly type: "string";
                    readonly default: "en";
                    readonly examples: readonly ["en"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Preferred language order for showing search results, overrides the value specified in the `Accept-Language` HTTP header. Defaults to `en`. \n\nTo use native language for the response when available, use `accept-language=native`. \n\nEither uses standard <a href=\"https://tools.ietf.org/html/rfc2616#section-14.4\" target=\"_blank\">rfc2616 accept-language string</a> or a simple comma separated list of language codes.";
                };
                readonly countrycodes: {
                    readonly type: "string";
                    readonly examples: readonly ["us,ca,gb"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Limit search results to a specific country or a comma-separated list of countries. Should be the ISO 3166-1 alpha-2 code(s).";
                };
                readonly normalizeaddress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Makes parsing of the `address` object easier by returning a predictable and defined list of elements. Defaults to `0` for backward compatibility. We recommend setting this to `1` for new projects.\n\n  Element Name  | Description\n  ------------- | -----------\n  name          | House name or Point of Interest (POI) such as a Cafe or School\n  house_number  | House or Building number\n  road          | Roads, Highways, Freeways, Motorways\n  neighbourhood | Neighbourhoods, Allotments, Quarters, Communities\n  suburb        | Suburbs, Subdivisions\n  island        | Islands, Islets\n  city          | Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets\n  county        | Counties\n  state         | States, Provinces, Regions, State Districts\n  state_code    | State or Province Code\n  postcode      | Postal Codes, Zipcodes\n  country       | Countries, Nation-states\n  country_code  | Country Code - 2 letter (ISO 3166-1 alpha-2)";
                };
                readonly normalizecity: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "For responses with no `city` value in the address section, the next available element in this order - `city_district`, `locality`, `town`, `borough`, `municipality`, `village`, `hamlet`, `quarter`, `neighbourhood` - from the address section will be normalized to city. Defaults to `0`.";
                };
                readonly postaladdress: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns address inside the `postaladdress` key, that is specifically formatted for each country. Currently supported for addresses in Belgium, Brazil, France, Germany, Greece, India, Ireland, Italy, Portugal, South Africa, Spain and United Kingdom. Defaults to `0`.";
                };
                readonly matchquality: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Returns additional information about quality of the result in a `matchquality` object. Defaults to `0`.";
                };
                readonly source: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If this parameter is not specified, LocationIQ uses multiple public and proprietary datasets to return results. If you'd like to restrict results to only OpenStreetMap data, you can set the value of this parameter to `nom`. This will only query our internal cluster of Nominatim servers, and return results. We may still apply some post-processing steps to these results though, so results may vary from the official Nominatim instance.";
                };
                readonly normalizeimportance: {
                    readonly type: "integer";
                    readonly default: 1;
                    readonly enum: readonly [0, 1];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "When this parameter is absent or set to `1`, the `importance` value(s) in the API response is limited to the range of 0 to 1. Values outside this range are adjusted to the nearest boundary (0 or 1). Setting `normalizeimportance` to `0` allows the importance value to be lower or higher than the specified range of 0 to 1. Defaults to `1`";
                };
                readonly dedupe: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Sometimes you have several objects in OSM identifying the same place or object in reality. The simplest case is a street being split in many different OSM ways due to different characteristics. Our Geocoder will attempt to detect such duplicates and only return one match; this is controlled by the dedupe parameter which defaults to `1`. Since the limit is, for reasons of efficiency, enforced before and not after de-duplicating, it is possible that de-duplicating leaves you with less results than requested.";
                };
                readonly namedetails: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include a list of alternative names in the results. These may include language variants, references, operator and brand. Defaults to `0`.";
                };
                readonly extratags: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Include additional information in the result if available, e.g. wikipedia link, opening hours. Defaults to `0`.";
                };
                readonly polygon_geojson: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in geojson format. Defaults to `0`.";
                };
                readonly polygon_kml: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in kml format. Defaults to `0`.";
                };
                readonly polygon_svg: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results in svg format. Defaults to `0`.";
                };
                readonly polygon_text: {
                    readonly type: "integer";
                    readonly enum: readonly [0, 1];
                    readonly default: 0;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Output geometry of results as a WKT. Defaults to `0`.";
                };
                readonly json_callback: {
                    readonly type: "string";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Wrap json output in a callback function (JSONP) i.e. &lt;string&gt;(&lt;json&gt;). Only has an effect for JSON output formats.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "location-forward-geocoding";
            readonly "x-stoplight": {
                readonly id: "360vfacsuwhfx";
            };
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly place_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the place.";
                    };
                    readonly licence: {
                        readonly type: "string";
                        readonly description: "License information for the data.";
                    };
                    readonly osm_type: {
                        readonly type: "string";
                        readonly description: "Type of OpenStreetMap object.";
                    };
                    readonly osm_id: {
                        readonly type: "string";
                        readonly description: "Unique identifier for the OpenStreetMap object.";
                    };
                    readonly lat: {
                        readonly type: "string";
                        readonly description: "Latitude of the location.";
                    };
                    readonly lon: {
                        readonly type: "string";
                        readonly description: "Longitude of the location.";
                    };
                    readonly display_name: {
                        readonly type: "string";
                        readonly description: "Formatted address for display.";
                    };
                    readonly class: {
                        readonly type: "string";
                        readonly description: "The category of this result";
                    };
                    readonly type: {
                        readonly type: "string";
                        readonly description: "The 'type' of the class/category of this result";
                    };
                    readonly importance: {
                        readonly type: "number";
                        readonly description: "Calculated importance of this result compared to the search query the user has provided. Ranges between 0 and 1.";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                    readonly address: {
                        readonly anyOf: readonly [{
                            readonly title: "address";
                            readonly type: "object";
                            readonly description: "Breakdown of the address into elements.\nAll these elements are optional and only those elements that are available for a given location will be returned.";
                            readonly properties: {
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Road name";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhood";
                                };
                                readonly hamlet: {
                                    readonly type: "string";
                                    readonly description: "Hamlet";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburb";
                                };
                                readonly village: {
                                    readonly type: "string";
                                    readonly description: "Village name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly town: {
                                    readonly type: "string";
                                    readonly description: "Town name";
                                };
                                readonly city_district: {
                                    readonly type: "string";
                                    readonly description: "Administrative area between city level and town level";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "City name";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly region: {
                                    readonly type: "string";
                                    readonly description: "Region name";
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "County name";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state_district: {
                                    readonly type: "string";
                                    readonly description: "District name";
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "State name";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal code";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Country name";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country code";
                                    readonly examples: readonly ["us"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "Name of the entity/road in the given location";
                                };
                                readonly water: {
                                    readonly type: "string";
                                    readonly "x-stoplight": {
                                        readonly id: "7nunw3epqpcqo";
                                    };
                                    readonly description: "The name of an ocean or sea, if the location falls within a body of water outside any country's administrative regions.";
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Result from Ocean": {
                                    readonly house_number: "3894";
                                    readonly road: "Spring Mill Way";
                                    readonly residential: "Hunter’s Point";
                                    readonly village: "Landen";
                                    readonly city: "Landen";
                                    readonly county: "Warren County";
                                    readonly state: "Ohio";
                                    readonly postcode: "45039";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                    readonly state_code: "oh";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                    readonly water: "South Pacific Ocean";
                                };
                            };
                        }, {
                            readonly title: "address-normalized";
                            readonly "x-stoplight": {
                                readonly id: "q798lnglnqkb4";
                            };
                            readonly type: "object";
                            readonly description: "The default address section returns a wide range of elements - from common ones such as `road` and `country` to obscure ones such as `hamlet`, `cycleway`, `park`. This was done to maintain backward compatibility with OpenStreetMap's Nominatim. To make parsing easier for developers, the `normalizeaddress` parameter rolls up elements in the `address` section of the response to the list of elements defined below.\n";
                            readonly properties: {
                                readonly name: {
                                    readonly type: "string";
                                    readonly description: "House name or Point of Interest (POI)";
                                };
                                readonly house_number: {
                                    readonly type: "string";
                                    readonly description: "House or Building number";
                                    readonly examples: readonly ["3894"];
                                };
                                readonly road: {
                                    readonly type: "string";
                                    readonly description: "Roads, Highways, Freeways, Motorways";
                                    readonly examples: readonly ["Spring Mill Way"];
                                };
                                readonly neighbourhood: {
                                    readonly type: "string";
                                    readonly description: "Neighbourhoods, Allotments, Quarters, Communities";
                                };
                                readonly suburb: {
                                    readonly type: "string";
                                    readonly description: "Suburbs, Subdivisions";
                                };
                                readonly island: {
                                    readonly type: "string";
                                    readonly description: "Islands, Islets";
                                };
                                readonly city: {
                                    readonly type: "string";
                                    readonly description: "Cities, Towns, Villages, Municipalities, Districts, Boroughs, Hamlets";
                                    readonly examples: readonly ["Landen"];
                                };
                                readonly county: {
                                    readonly type: "string";
                                    readonly description: "Counties";
                                    readonly examples: readonly ["Warren County"];
                                };
                                readonly state: {
                                    readonly type: "string";
                                    readonly description: "States, Provinces, Regions, State Districts";
                                    readonly examples: readonly ["Ohio"];
                                };
                                readonly state_code: {
                                    readonly type: "string";
                                    readonly description: "State or Province Code";
                                    readonly examples: readonly ["oh"];
                                };
                                readonly postcode: {
                                    readonly type: "string";
                                    readonly description: "Postal Codes, Zipcodes";
                                    readonly examples: readonly ["45039"];
                                };
                                readonly country: {
                                    readonly type: "string";
                                    readonly description: "Countries, Nation-states";
                                    readonly examples: readonly ["United States of America"];
                                };
                                readonly country_code: {
                                    readonly type: "string";
                                    readonly description: "Country Code - 2 letter (ISO 3166-1 alpha-2)";
                                    readonly examples: readonly ["us"];
                                };
                            };
                            readonly "x-examples": {
                                readonly "Example 1": {
                                    readonly name: "Empire State Building";
                                    readonly house_number: "350";
                                    readonly road: "5th Avenue";
                                    readonly neighbourhood: "Manhattan Community Board 5";
                                    readonly suburb: "Manhattan";
                                    readonly city: "New York";
                                    readonly county: "New York County";
                                    readonly state: "New York";
                                    readonly postcode: "10001";
                                    readonly country: "United States of America";
                                    readonly country_code: "us";
                                };
                                readonly "Result from Ocean": {
                                    readonly name: "South Pacific Ocean";
                                };
                                readonly "Example 2": {
                                    readonly name: "South Pacific Ocean";
                                };
                            };
                        }];
                    };
                    readonly boundingbox: {
                        readonly type: "array";
                        readonly description: "List of bounding box coordinates [min_lat, max_lat, min_lon, max_lon].";
                        readonly items: {
                            readonly type: "string";
                        };
                    };
                    readonly namedetails: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly name: "Empire State Building";
                                readonly "name:en": "Empire State Building";
                                readonly "name:es": "Edificio Empire State";
                                readonly "name:he": "בניין אמפייר סטייט";
                                readonly "name:hi": "एम्पायर स्टेट बिल्डिंग";
                                readonly "name:ko": "엠파이어 스테이트 빌딩";
                                readonly "name:ru": "Эмпайр-Стейт-Билдинг";
                                readonly "name:uk": "Емпайр-Стейт-Білдінг";
                                readonly "name:zh": "帝国大厦";
                            };
                        };
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                        };
                        readonly description: "The dictionary with full list of available names including ref etc. Returned when `namedetails=1` is set in the request.\n";
                    };
                    readonly extratags: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly ele: "15";
                                readonly height: "443.2";
                                readonly wikidata: "Q9188";
                                readonly wikipedia: "en:Empire State Building";
                                readonly start_date: "1931";
                                readonly wheelchair: "yes";
                                readonly "building:use": "office";
                                readonly opening_hours: "Mo-Su 08:00-02:00";
                                readonly "building:levels": "102";
                                readonly construction_date: "1930-1931";
                            };
                        };
                        readonly description: "The dictionary with additional useful tags like website or maxspeed. Returned when `extratags=1` is set in the request.\n";
                        readonly additionalProperties: true;
                    };
                    readonly geojson: {
                        readonly type: "object";
                        readonly properties: {
                            readonly type: {
                                readonly type: "string";
                            };
                            readonly coordinates: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "number";
                                };
                            };
                        };
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly type: "Polygon";
                                readonly coordinates: readonly [readonly [readonly [-73.9865012, 40.748491], readonly [-73.9851602, 40.7479255], readonly [-73.9848166, 40.7483931], readonly [-73.9861574, 40.7489585], readonly [-73.9863252, 40.7487301], readonly [-73.9863554, 40.748689], readonly [-73.9864839, 40.7485145], readonly [-73.9865012, 40.748491]]];
                            };
                        };
                        readonly description: "Output geometry of results in geojson format. Returned when `polygon_geojson=1` is set in the request.";
                    };
                    readonly geokml: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "<Polygon><outerBoundaryIs><LinearRing><coordinates>-73.986501200000006,40.748491000000001 -73.985160199999996,40.747925500000001 -73.984816600000002,40.748393100000001 -73.986157399999996,40.748958500000001 -73.986325199999996,40.748730100000003 -73.986355399999994,40.748688999999999 -73.986483899999996,40.748514499999999 -73.986501200000006,40.748491000000001</coordinates></LinearRing></outerBoundaryIs></Polygon>";
                        };
                        readonly description: "Output geometry of results in kml format. Returned when `polygon_kml=1` is set in the request.";
                    };
                    readonly svg: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "M -73.9865012 -40.748491 L -73.9851602 -40.7479255 -73.9848166 -40.7483931 -73.9861574 -40.7489585 -73.9863252 -40.7487301 -73.9863554 -40.748689 -73.9864839 -40.7485145 Z";
                        };
                        readonly description: "Output geometry of results in svg format. Returned when `polygon_svg=1` is set in the request.";
                    };
                    readonly geotext: {
                        readonly type: "string";
                        readonly "x-examples": {
                            readonly "Example 1": "POLYGON((-73.9865012 40.748491,-73.9851602 40.7479255,-73.9848166 40.7483931,-73.9861574 40.7489585,-73.9863252 40.7487301,-73.9863554 40.748689,-73.9864839 40.7485145,-73.9865012 40.748491))";
                        };
                        readonly title: "";
                        readonly description: "Output geometry of results as a WKT. Returned when `polygon_text=1` is set in the request.";
                    };
                    readonly icon: {
                        readonly type: "string";
                        readonly "x-stoplight": {
                            readonly id: "udpck9wsvlgou";
                        };
                        readonly description: "The URL of an icon representing this result, if applicable.";
                    };
                    readonly matchquality: {
                        readonly type: "object";
                        readonly "x-examples": {
                            readonly "Example 1": {
                                readonly matchcode: "exact";
                                readonly matchtype: "point";
                                readonly matchlevel: "venue";
                            };
                        };
                        readonly description: "An additional object `matchquality` for every result in the response, containing the following elements: `matchcode`, `matchtype`, `matchlevel`.";
                        readonly properties: {
                            readonly matchcode: {
                                readonly title: "matchcode";
                                readonly "x-stoplight": {
                                    readonly id: "keiun4kwm07z4";
                                };
                                readonly type: "string";
                                readonly description: "Specifies the quality of the returned address.\n\n matchcode  | description\n ------------|---------------\n  exact      | The result matches the input query with a high level of probability.\n  fallback   | The result does not exactly match the input but is closely related to it provided there is direct a heierarchial relation.\n  approximate| The result matches the input query with a medium to low level of probability.\n";
                            };
                            readonly matchtype: {
                                readonly title: "matchtype";
                                readonly "x-stoplight": {
                                    readonly id: "20ejxqp1iy2wr";
                                };
                                readonly type: "string";
                                readonly description: "Specifies quality of the returned location match\n  \n  matchtype    | description\n --------------|---------------\n  point        | The coordinate returned is a point address, typically with rooftop accuracy.\n  centroid     | The coordinate returned is a centroid of a road or administrative boundary.\n  interpolated | The coordinate returned is a point determined by interpolation.";
                            };
                            readonly matchlevel: {
                                readonly type: "string";
                                readonly "x-examples": {
                                    readonly "Example 1": "venue";
                                };
                                readonly description: "Specifies the most granular address element that matches the geocoding query.\n\n matchlevel       | details\n -----------------|---------------\n  venue           | The returned address is of a Point of Interest (PoI) level.\n  building        | The returned address is of a house level.\n  street          | The returned address is on a street level.\n  neighbourhood   | The returned address is on a neighbourhood level.\n  island          | The returned address is on a island level.\n  borough         | The returned address is on a borough level.\n  city            | The returned address is on a city level.\n  county          | The returned address is on a county level.\n  state           | The returned address is on a state level.\n  country         | The returned address is on a country level.\n  marine          | The returned address is on a marine level.\n  postalcode      | The returned address is on a postalcode level.";
                            };
                        };
                    };
                    readonly postaladdress: {
                        readonly title: "postaladdress";
                        readonly "x-stoplight": {
                            readonly id: "zq4zgnef9uq9n";
                        };
                        readonly type: "string";
                        readonly description: "Returns address specifically formatted for each country. Returned when `postaladdress` is set in the request";
                        readonly "x-examples": {
                            readonly "Example 1": "5, Avenue Anatole France, 75007, Paris, France";
                        };
                    };
                };
                readonly required: readonly ["place_id", "licence", "lat", "lon", "display_name", "boundingbox"];
            };
            readonly description: "";
            readonly "x-examples": {
                readonly "Example 1": readonly [{
                    readonly place_id: "223483692";
                    readonly licence: "© LocationIQ.com CC BY 4.0, Data © OpenStreetMap contributors, ODbL 1.0";
                    readonly osm_type: "way";
                    readonly osm_id: "19301621";
                    readonly boundingbox: readonly ["39.307405567782", "39.307505567782", "-84.292824851595", "-84.292724851595"];
                    readonly lat: "39.3074555677816";
                    readonly lon: "-84.2927748515948";
                    readonly display_name: "3894, Spring Mill Way, Hunter’s Point, Landen, Warren County, Ohio, 45039, United States of America";
                    readonly class: "place";
                    readonly type: "house";
                    readonly importance: 0.62025;
                    readonly address: {
                        readonly name: "Empire State Building";
                        readonly house_number: "3894";
                        readonly road: "Spring Mill Way";
                        readonly residential: "Hunter’s Point";
                        readonly village: "Landen";
                        readonly county: "Warren County";
                        readonly state: "Ohio";
                        readonly postcode: "45039";
                        readonly country: "United States of America";
                        readonly country_code: "us";
                        readonly city: "Landen";
                    };
                }];
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "429": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "error";
            readonly type: "object";
            readonly properties: {
                readonly error: {
                    readonly type: "string";
                    readonly examples: readonly ["Invalid key"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { Autocomplete, Balance, Directions, GetTimezone, Lookup, Matching, Matrix, Nearby, Nearest, Optimize, Reverse, Search, SearchPostalcode, SearchStructured };
