const User = require("../models/users.model");
const { distanceCal } = require("../utils/measureDistance");

const searchChildCarer = async (req, res) => {
  const { city, gender, maxDistance } = req.query;
  const offerProvide = req.body.offerProvide || [];

  console.log(city, gender, maxDistance);

  // let searchedDistance;

  const searchMaxDistance = maxDistance ? Number(maxDistance) : 30;

  const filtering = [{ $match: { role: "childcarer" } }];

  if (gender) {
    filtering.push({ $match: { gender: gender } });
  }
  if (offerProvide.length > 0) {
    filtering.push({
      $match: {
        offerProvide: {
          $elemMatch: {
            $in: offerProvide,
          },
        },
      },
    });
  }

  try {
    const filteredUser = await User.aggregate(filtering);
    if (filteredUser.length > 0) {
      const users = [];
      for (i = 0; i < filteredUser.length; i++) {
        const distance = await distanceCal(filteredUser[i].residance, city);
        if (distance <= searchMaxDistance) {
          users.push({ ...filteredUser[i], measuredDistance: distance });
        }
      }

      res.status(200).send(users);
    } else {
      res.status(401).send({
        message: "No matched users",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { searchChildCarer };

// const User = require("../models/users.model");
// const { distanceCal } = require("../utils/measureDistance");

// const searchChildCarer = async (req, res) => {
//   const { city, gender } = req.query;
//   const offerProvide = req.body.offerProvide || [];
//   const userAddress = req.body.userAddress;

//   let searchedDistance;

//   if (city) {
//     const searchedLocation = await distanceCal(city, userAddress);
//     searchedDistance = searchedLocation;
//   }

//   const filtering = [{ $match: { role: "childcarer" } }];

//   if (gender) {
//     filtering.push({ $match: { gender: gender } });
//   }
//   if (offerProvide.length > 0) {
//     filtering.push({
//       $match: {
//         offerProvide: {
//           $elemMatch: {
//             $in: offerProvide,
//           },
//         },
//       },
//     });
//   }

//   try {
//     if (searchedDistance) {
//       if (searchedDistance > 100) {
//         res.status(401).send({
//           message: "Distance is more than 100",
//           status: 401,
//         });
//       } else {
//         const filteredUser = await User.aggregate(filtering);
//         if (filteredUser.length > 0) {
//           const users = [];
//           for (i = 0; i < filteredUser.length; i++) {
//             const distance = await distanceCal(
//               filteredUser[i].residance,
//               userAddress
//             );
//             if (distance <= searchedDistance) {
//               users.push({ ...filteredUser[i], measuredDistance: distance });
//             }
//           }
//           res.status(200).send(users);
//         } else {
//           res.status(401).send({
//             message: "No matched users",
//           });
//         }
//       }
//     } else {
//       const filteredUser = await User.aggregate(filtering);
//       if (filteredUser.length > 0) {
//         const users = [];
//         for (i = 0; i < filteredUser.length; i++) {
//           const distance = await distanceCal(
//             filteredUser[i].residance,
//             userAddress
//           );

//           users.push({ ...filteredUser[i], measuredDistance: distance });
//         }
//         res.status(200).send(users);
//       } else {
//         res.status(401).send({
//           message: "No matched users",
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// module.exports = { searchChildCarer };
