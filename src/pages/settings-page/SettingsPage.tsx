import { useEffect, createContext, useState, useLayoutEffect } from "react";
import { protectedResources } from "../../authConfig";
import {
  useFetchWithMsal,
} from "../../hooks/useFetchWithMsal";
import RemoveIcon from "../../icons/remove-icon/Remove.svg";

import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";

const RoleManager = ({ data, onSaveUpdate }: any) => {
  const [roles, setRoles] = useState<any>(data);

  const [newPage, setNewPage] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  function handleSaveRoles() {
    onSaveUpdate(roles);
    console.log(roles, "save updated roles");
  }

  const handleRemovePage = (pageIndex: any) => {
    const updatedRoles = [...roles];
    updatedRoles[selectedRoleIndex].pages.splice(pageIndex, 1);
    setRoles(updatedRoles);
  };

  const handleRemoveCountry = (countryIndex: any) => {
    const updatedRoles = [...roles];
    updatedRoles[selectedRoleIndex].countries.splice(countryIndex, 1);
    setRoles(updatedRoles);
  };

  const handleAddPage = () => {
    if (newPage.trim() === "") return;
    const updatedRoles = [...roles];
    updatedRoles[selectedRoleIndex].pages.push(newPage);
    setRoles(updatedRoles);
    setNewPage("");
  };

  const handleAddCountry = () => {
    if (newCountry.trim() === "") return;
    const updatedRoles = [...roles];
    updatedRoles[selectedRoleIndex].countries.push(newCountry);
    setRoles(updatedRoles);
    setNewCountry("");
  };

  return (
    <Container>
      <FormControl fullWidth margin="normal">
        <InputLabel id="role-select-label">Select Role</InputLabel>
        <Select
          labelId="role-select-label"
          value={selectedRoleIndex}
          onChange={(e: any) => setSelectedRoleIndex(e.target.value)}
        >
          {roles.map((role: any, index: any) => (
            <MenuItem key={index} value={index}>
              {role.roleName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h5" component="h2" gutterBottom>
        {roles[selectedRoleIndex].roleName}
      </Typography>

      <Box mb={4}>
        <Typography variant="h6" component="h3">
          Pages Access
        </Typography>
        <List>
          {roles[selectedRoleIndex].pages.map((page: any, index: any) => (
            <ListItem key={page}>
              <ListItemText primary={page} />{" "}
              <img
                src={RemoveIcon}
                alt="remove"
                onClick={() =>
                    handleRemovePage(index)
                }
              />
            </ListItem>
          ))}
        </List>
        <TextField
          label="Add new page"
          variant="outlined"
          fullWidth
          value={newPage}
          onChange={(e) => setNewPage(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddPage}>
          Add Page
        </Button>
      </Box>

      <Box mb={4}>
        <Typography variant="h6" component="h3">
          Countries
        </Typography>
        <List>
          {roles[selectedRoleIndex].countries.map(
            (country: any, index: any) => (
              <ListItem key={country}>
                <ListItemText primary={country} />
                <img
                src={RemoveIcon}
                alt="remove"
                onClick={() =>
                    handleRemoveCountry(index)
                }
              />
              </ListItem>
            )
          )}
        </List>
        <TextField
          label="Add new country"
          variant="outlined"
          fullWidth
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddCountry}>
          Add Country
        </Button>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSaveRoles}>
        Save
      </Button>
    </Container>
  );
};

const SettingsPage = () => {
  const { isLoading, error, data, execute } = useFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  const { data: updateRolesResult, execute: executeupdateRoles } = useFetchWithMsal({
    scopes: protectedResources.apiTodoList.scopes.read,
  });

  async function handleSaveUpdatedRoles(updatedRoles: any){
    await execute("PUT", `${process.env.REACT_APP_API_URL_PROXY}/api/roles`, {roles: updatedRoles});
    await execute("GET", `${process.env.REACT_APP_API_URL_PROXY}/api/roles`, null);
  }

  useEffect(() => {
    const fetchData = async (): Promise<any> => {
      try {
        await execute("GET", `${process.env.REACT_APP_API_URL_PROXY}/api/roles`, null);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };

    fetchData();
  }, [execute]);

  console.log(data, "roles data");

  return <div>{data?.roles && <RoleManager data={data?.roles} onSaveUpdate={handleSaveUpdatedRoles}/>}</div>;
};

export default SettingsPage;
