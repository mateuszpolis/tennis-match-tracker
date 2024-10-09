import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import useDebounce from "../../../hooks/useDebounce";
import { User } from "../../../models/User";
import { useUser } from "../../../context/UserContext";

interface PlayerSelectProps {
  control: any;
  errors: any;
  name: string;
  label: string;
  defaultValue?: number;
}

const PlayerSelect = ({
  control,
  errors,
  name,
  label,
  defaultValue,
}: PlayerSelectProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const { getUsersByQuery, getUserById } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (defaultValue) {
      const fetchUserById = async () => {
        setLoading(true);
        const user = await getUserById(defaultValue);
        setSelectedUser(user);
        setInputValue(user?.name || "");
        setLoading(false);
      };
      fetchUserById();
    }
  }, [defaultValue, getUserById]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        setUsers(await getUsersByQuery(debouncedQuery || ""));
      } catch (e: any) {
        toast.error(e.response.data.message || "Error occurred");
      }

      setLoading(false);
    };

    if (debouncedQuery || debouncedQuery === "") {
      fetchUsers();
    }
  }, [debouncedQuery]);

  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field }) => (
        <Autocomplete
          {...field}
          value={selectedUser}
          inputValue={inputValue}
          options={users}
          loading={loading}
          getOptionLabel={(option) => option.name || ""}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            setSelectedUser(null);
          }}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
            setInputValue(newValue ? newValue.name : "");
            field.onChange(newValue ? newValue.id : "");
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              error={!!errors[name]}
              helperText={errors[name] ? String(errors[name].message) : ""}
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

export default PlayerSelect;
