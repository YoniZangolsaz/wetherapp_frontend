export const style = {
  mainBox: {
    width: "20%",
    height: "60%",
    borderRadius: 3,
    backgroundImage: "linear-gradient(180deg, #130754 0%, #3b2f80 100%)",
    mt: 6,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  searchBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  autoComplete: {
    width: "50%",
    borderRadius: 15,
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: 15,
    },
  },
  searchInput: {
    background: "white",
    borderRadius: 15,
    "&:focus-within fieldset, &:focus-visible fieldset": {
      border: "white",
    },
  },
  searchButton: {
    background: "white",
    ml: 2,
    "&:hover": { background: "white", opacity: 0.8 },
  },
  tempText: {
    fontSize: "4rem",
    fontWeight: 400,
  },
  countryText: {
    fontSize: "2rem",
    fontWeight: 400,
  },
  weatherIcon: {
    width: "45%",
    height: "30%",
  },
  propBox: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-around",
    width: "100%",
    textAlign: "center",
  },
  propText: {
    fontSize: "1rem",
    fontWeight: 400,
  },
  icon: {
    width: "23%",
  },
  stack: {
    alignItems: "flex-start",
  },
};
