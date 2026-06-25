import fs from "fs";

const theWorld = JSON.parse(
    fs.readFileSync("./theworld.json", "utf-8")
);

const zipFormats = Object.values(theWorld)
    .filter(country => country.zipFormat?.trim())
    .reduce((acc, country) => {
        const format = country.zipFormat;

        if (!acc[format]) {
            acc[format] = [];
        }

        acc[format].push(country.codes.iso2);

        return acc;
    }, {});

const output = Object.entries(zipFormats).map(([format, countries]) => {

    const body = JSON.stringify({
        parentValue: countries,
        pattern: `^${format}$`,
        sortOrder: 0,
        question: "zipcode"
    }, null, 2);

    return `
curl 'https://www.turn2opinion.com/api/v1/validation' \
  -X 'PUT' \
  -H 'accept-language: en-GB,en-US;q=0.9,en;q=0.8' \
  -H 'content-type: application/json' \
  -b 'authorization=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTIyYWNmZjM0NjU2MmYzMGEyZmRhOWIiLCJjYXRlZ29yeSI6ImIyYyIsImVtYWlsIjoib3B0aXdhcmkuaW5kaWFAZ21haWwuY29tIiwicGhvbmUiOiI5MTgxMzAyMDI4NzkiLCJuYW1lIjp7InNhbHV0YXRpb24iOiJNci4iLCJmaXJzdCI6Ik9tIiwibGFzdCI6IlRpd2FyaSIsIm1pZGRsZSI6IiJ9LCJvcmlnaW4iOiJ3d3cudHVybjJvcGluaW9uLmNvbSIsInJvbGUiOiIiLCJpYXQiOjE3ODIyODYwNTksImV4cCI6MTc4Mjg5MDg1OX0.Ptd0BM9Y6MN33IBx8x47GqM0PTcmU5XKjGYooodxLyA' \
  -H 'origin: https://www.turn2opinion.com' \
  -H 'referer: https://www.turn2opinion.com/admin/validations?que=6971d843724805825b35a12e' \
  --data-binary @- <<'JSON'
${body}
JSON
`;
});

fs.writeFileSync(
    "zipcode.bash",
    output.join("\n\n"),
    "utf-8"
);

console.log(`Generated ${output.length} curl commands`);
