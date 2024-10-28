const cds = require("@sap/cds");
const { symlink } = require("fs");
const { Orders } = cds.entities("com.training");
module.exports = (srv) => {
    //********READ*************//
    srv.on("READ", "GetOrders", async (req) => {
        return await SELECT.from(Orders);
    });

    srv.after("READ", "GetOrders", (data) => {
        return data.map((order) => (order.orderstatus = 1));
    });


    //********CREATE*************//
    srv.on("CREATE", "CreateOrder", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run(
                INSERT.into(Orders).entries({
                    id: req.data.id,
                    email: req.data.email,
                    firstname: req.data.firstname,
                    lastname: req.data.lastname,
                    country: req.data.country,
                    deliverydate: req.data.deliverydate,
                    orderstatus: req.data.orderstatus,
                })
            )
            .then((resolve, reject) => {
                console.log("resolve:", resolve);
                console.log("reject:", reject);
                if (typeof resolve !== "undefined") {
                    return req.data;
                } else {
                    req.error(409, "Record Not Inserted");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return returnData;
    });

    srv.before("CREATE", "Orders", (req) => {
        req.data.createon = new Date().toISOString().slice(0, 10);
        return req;
    });

    //************UPDATE******/
    srv.on("UPDATE", "Orders", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run([
                UPDATE(Orders, req.data.id).set({
                    email: req.data.email,
                    firstName: req.data.firstName,
                    lastName: req.data.lastName,
                    country: req.data.country,
                    deliverydate: req.data.deliverydate,
                    orderstatus: req.data.orderstatus,
                }),
            ])
            .then((resolve, reject) => {
                console.log("Resolve: ", resolve);
                console.log("Reject: ", reject);

                if (resolve[0] == 0) {
                    req.error(409, "Record Not Found");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return returnData;
    });

    //************DELETE******/
    srv.on("DELETE", "Orders", async (req) => {
        let returnData = await cds
            .transaction(req)
            .run(
                DELETE.from(Orders).where({
                    id: req.data.id,
                })
            )
            .then((resolve, reject) => {
                console.log("Resolve", resolve);
                console.log("Reject", reject);

                if (resolve !== 1) {
                    req.error(409, "Record Not Found");
                }
            })
            .catch((err) => {
                console.log(err);
                req.error(err.code, err.message);
            });
        console.log("Before End", returnData);
        return await returnData;
    });

    //************ACTION******/
  srv.on("cancelOrder", async (req) => {
    const { id } = req.data;
    const db = srv.transaction(req);

    const resultsRead = await db
      .read(Orders, ["firstname", "lastname","orderstatus"])
      .where({ id: id });

    let returnOrder = {
      status: "",
      message: "",
    };

    console.log(id);
    console.log(resultsRead);

    if (resultsRead[0].orderstatus == 1) {
      const resultsUpdate = await db
        .update(Orders)
        .set({ Status: 3 })
        .where({ id: id });
      returnOrder.status = "Succeeded";
      returnOrder.message = `The Order placed by ${resultsRead[0].firstname} ${resultsRead[0].lastname} was canceled`;
    } else {
      returnOrder.status = "Failed";
      returnOrder.message = `The Order placed by ${resultsRead[0].firstname} ${resultsRead[0].lastName} was NOT canceled becouse was already approved`;
    }
    console.log("Action cancelOrder executed");
    return returnOrder;
  });
};