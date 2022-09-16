export const required = (value: string | number) => (value && value !== '' ? undefined : `This field is required`);
