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

// Validate fursona
export function validateFursona(fursona: Sona): string[] {
	let reasons = [];
	if (!fursona.name) reasons.push('Missing fursona name');
	if (!fursona.species) reasons.push('Missing fursona species');
	if (!fursona.description) reasons.push('Missing fursona description');
	if (fursona.description.length > 250) reasons.push('Fursona description is too long');
	if (fursona.ref && !isURL(fursona.ref)) reasons.push('Fursona ref is not a valid URL');
	if (fursona.avatar && !isURL(fursona.avatar)) reasons.push('Fursona avatar is not a valid URL');
	if (fursona.age && fursona.age < 0) reasons.push('Fursona age is negative');
	if (fursona.birthdate && !isISO8601(fursona.birthdate))
		reasons.push('Fursona birthdate is not a valid ISO 8601 date');
	if (fursona.colors && !Array.isArray(fursona.colors))
		reasons.push('Fursona colors is not an array');
	if (fursona.colors && fursona.colors.some((color) => !isColor(color)))
		reasons.push('Fursona colors contains an invalid color');
	return reasons;
}

// Validate fursona schema
export function validateFursonaSchema(fursonaSchema: FursonaSchema): boolean {
	if (!fursonaSchema.sonas) return false;
	if (!Array.isArray(fursonaSchema.sonas)) return false;
	if (fursonaSchema.sonas.length > 10) return false;
	if (fursonaSchema.sonas.some((sona) => !validateFursona(sona))) return false;
	return true;
}

function isColor(color: string): boolean {
	return /^#([0-9a-f]{3}){1,2}$/i.test(color);
}

function isURL(url: string): boolean {
	try {
		new URL(url);
		return true;
	} catch (err) {
		return false;
	}
}

function isISO8601(date: string): boolean {
	return !isNaN(Date.parse(date));
}
