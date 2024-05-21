import "./AltTable.scss";

import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useExceptionsData } from "../../hooks/swr-hooks/useReports";


const mockData = [
  {
    product_name: "ANTRACOL WP70 1X25KG BAG ZA	",
    material_number: null,
    uom: "kg",
    volume: 58.0,
    chooses_by_datastuart_option: 84057002,
    alternatives: [
      {
        material_number: 84057002,
        material_name: "ANTRACOL WP70 1X10KG BAG UA",
      },
      {
        material_number: 88651251,
        material_name: "ANTRACOL WG70 1X10KG CAS UA",
      },
    ],
  }
];


const ProductTable = ({ product, index }: any) => {
  const { product_name, material_number, uom, volume } = product;

  return (
    <TableContainer component={Paper} style={{ height: "100%" }}>
      <Table className="sub-table product-table">
        <TableHead>
          <TableRow className={index > 0 ? "collapsed-head" : "head"}>
            <TableCell className="main-header-cell" colSpan={4}>
              reported by Distributor
            </TableCell>
          </TableRow>
          <TableRow className={index > 0 ? "collapsed-head" : "head"}>
            <TableCell className="heade-cell">Product</TableCell>
            <TableCell className="heade-cell">Item Code</TableCell>
            <TableCell className="heade-cell">UOM</TableCell>
            <TableCell className="heade-cell">Volume</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell className="cell">{product_name}</TableCell>
            <TableCell className="cell">{material_number || "-"}</TableCell>
            <TableCell className="cell">{uom}</TableCell>
            <TableCell className="cell">{volume}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AlternativesTable = ({ alternatives, index, onSave, productId }: any) => {
  const [choosedAlternative, setChoosedUlternative] = useState<any>(null);

  function handleAlternativeClick(alternative: any) {
    alternative === choosedAlternative
      ? setChoosedUlternative(null)
      : setChoosedUlternative(alternative);
  }

  function handleSave() {
    onSave({
      product_id: productId,
      correct_material_number: choosedAlternative,
    });
  }

  return (
    <TableContainer component={Paper} style={{ height: "100%" }}>
      <Table className="alt-table">
        <TableHead>
          <TableRow className={index > 0 ? "collapsed-head" : "head"}>
            <TableCell className="main-header-cell" colSpan={3}>
              Alternatives
            </TableCell>
          </TableRow>
          <TableRow className={index > 0 ? "collapsed-head" : "head"}>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Unit</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {alternatives.map((alternative: any, index: any) => (
            <TableRow
              sx={{height: "20px", color: "red", padding: "5px"}}
              onClick={() =>
                handleAlternativeClick(alternative?.material_number)
              }
              key={index}
              className={
                choosedAlternative === alternative?.material_number
                  ? "choosed-row"
                  : "unchoosed-row"
              }
            >
              <TableCell className="cell">
                {alternative?.material_name}
              </TableCell>
              <TableCell className="cell">
                {alternative?.material_number}
              </TableCell>
              <TableCell className="cell">{alternative?.buom || "-"}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3}>
              <div className="save-section">
                <Button disabled={!choosedAlternative} onClick={handleSave} >
                Save
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const ProductAlternativesDetails = ({ filename }: any) => {
  const { data, error, isLoading } = useExceptionsData(filename);

  function sendChoosedAlternativites(choosedAlt: any) {
    console.log(choosedAlt, "altNumber");
  }

  return (
    <div className="product-details-taible">
 
      { /*!isLoading && !!error ? (
        data.map((product: any, index: number) => (
          <div className="tabels-container">
            <div className="product-table-container">
              <ProductTable
                style={{ height: "100%" }}
                product={product}
                index={index}
              />
            </div>
            <div className="alternatives-table-container">
              <AlternativesTable
                alternatives={product.alternatives}
                productId={product?.product_name}
                index={index}
                onSave={sendChoosedAlternativites}
              />
            </div>
          </div>
        ))
      ) : (
        <div>please wait</div>
      ) */}



      {
          mockData.map((product: any, index: number) => (
            <div className="tabels-container">
              <div className="product-table-container">
                <ProductTable
                  style={{ height: "100%" }}
                  product={product}
                  index={index}
                />
              </div>
              <div className="alternatives-table-container">
                <AlternativesTable
                  alternatives={product.alternatives}
                  productId={product?.product_name}
                  index={index}
                  onSave={sendChoosedAlternativites}
                />
              </div>
            </div>
          ))
      }
    </div>
  );
};

export default ProductAlternativesDetails;
