const isValidNumber = (value, { req, location, path }) => {
  if (!value) {
    return false;
  }

  if (value > 1 && value < 100) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  isValidNumber,
};
