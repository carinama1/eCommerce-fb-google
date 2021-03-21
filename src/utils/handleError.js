export const handleError = (err, cb, navigate) => {
  if (err && err.response) {
    const { status } = err.response;
    if (status === 401) {
      navigate('/login', {
        state: { message: err.response.data.error.message },
        replace: true
      });
    } else {
      cb(false, err.response.data.error.message);
    }
  } else {
    cb(false, 'Please check your network connection');
  }
};
