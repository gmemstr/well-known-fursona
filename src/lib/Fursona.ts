/*
TypeScript type for the following JSON:

{
    "sonas": [
        {
            "name": "Example Fursona",
            "pronouns": "They/Them",
            "gender": "Nonbinary",
            "species": "Species",
            "description": "A description of the fursona, max 250 characters",
            "ref": "https://example.com/ref",
            "avatar": "http://example.com/avatar.png",
            "age": 25,
            "birthdate": "1996-01-01T20:20:39+00:00",
            "colors": [
                "#ff0000",
                "#0f0",
                "#00f"
            ]
        }
    ]
}
*/
export interface FursonaSchema {
	sonas: Sona[];
}

export interface Sona {
	name: string;
	pronouns?: string;
	gender?: string;
	species: string;
	description: string;
	ref?: string;
	avatar?: string;
	age?: number;
	birthdate?: string;
	colors?: string[];
}
