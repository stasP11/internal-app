import InfoField from "../InfoField/InfoField";
import ContactInfoField from "../ContactInfoField/ContactInfoField";
import StatusField from "../StatusField/StatusField";
import { Box } from "@mui/material";
import { EditedDistributor } from "components/DistributorsTable/types";

function DistributorDetails({
  distributor,
}: {
  distributor: EditedDistributor;
}) {
  return (
    <Box className="info-fields-container">
      <InfoField label="Name" content={distributor.distributor_name} />
      <InfoField label="Code" content={distributor.distributor_id} />
      <InfoField
        label="Status"
        content={<StatusField status={distributor.active} />}
      />
      <ContactInfoField label="Phone" contacts={distributor.phone} />
      <ContactInfoField label="Email" contacts={distributor.emails} />
    </Box>
  );
}

export default DistributorDetails;
