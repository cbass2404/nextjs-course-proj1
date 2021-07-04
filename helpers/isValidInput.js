export const isValidInput = (input) => {
    return input.trim() === '' || !input ? false : true;
};
