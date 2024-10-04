import { Controller } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { TennisGround } from "../../../models/TennisGround";
import { useTennisGround } from "../../../context/TennisGroundContext";
import useDebounce from "../../../hooks/useDebounce";

const GroundSelect = ({ control, errors }: { control: any; errors: any }) => {
  const [grounds, setGrounds] = useState<TennisGround[]>([]);
  const { getGroundsByName, fetchGrounds } = useTennisGround();
  const [inputValue, setInputValue] = useState("");
  const [selectedGround, setSelectedGround] = useState<TennisGround | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 1000);

  useEffect(() => {
    const fetchTennisGrounds = async () => {
      setLoading(true);
      if (debouncedQuery !== "") {
        setGrounds(await getGroundsByName(debouncedQuery));
      } else {
        setGrounds(await fetchGrounds());
      }
      setLoading(false);
    };

    if (debouncedQuery || debouncedQuery === "") {
      fetchTennisGrounds();
    }
  }, [debouncedQuery]);

  return (
    <Controller
      name="tennisGroundId"
      control={control}
      rules={{ required: "Tennis Ground is required" }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={selectedGround}
          inputValue={inputValue}
          options={grounds}
          loading={loading}
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            setSelectedGround(null);
          }}
          onChange={(event, newValue) => {
            setSelectedGround(newValue);
            setInputValue(newValue ? newValue.name : "");
            field.onChange(newValue ? newValue.id : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Tennis Ground"
              variant="outlined"
              error={!!errors.tennisGroundId}
              helperText={
                errors.tennisGroundId
                  ? String(errors.tennisGroundId.message)
                  : ""
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default GroundSelect;
