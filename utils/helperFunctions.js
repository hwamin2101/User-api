const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const validateEmail = (email) => {
  const emailRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,7})+$/;
  return emailRegex.test(email);
};

export default { formatDate, validateEmail };