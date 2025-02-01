import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import api from "../Api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../Constants";

const Navbar = () => {
  const [open, SetOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [token, SetToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [MainUserId, setMainUserId] = useState(null);
  const Toggle = () => {
    SetOpen(!open);
  };

  const LogOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userid");
    navigate("/");
    location.reload();
  };

  const toggleProfilePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    const AccessToken = localStorage.getItem(ACCESS_TOKEN);
    if (AccessToken) {
      SetToken(AccessToken);
      const decoded = jwtDecode(AccessToken);
      // console.log(decoded)
      setUserId(decoded.user_id);
    }
  }, []);

  
    useEffect(() => {
      if (userId) {
        const fetchMainUser = async () => {
          try {
            setLoading(true);
            const response = await fetch(
              `http://127.0.0.1:8000/track/MainUserList/${userId}/`
            );
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }
            const result = await response.json();
            if (result.length > 0) {
              setMainUserId(result[0].id);
            }
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchMainUser();
      }
    }, [userId]);

  useEffect(() => {
    api.get(`track/MainUserList/${MainUserId}/`)
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
  }, [MainUserId]);

  return (
    <>
      {isPopupOpen && (
        <>
          <div
            className="overlay"
            onClick={toggleProfilePopup}
            style={{ display: "block" }}
          />
          <div className="popup" style={{ display: "block" }}>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEBUSEhIVFRUVFRUVFRUXFxgXFRUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi4lHR0tLS0tLS0tLS0tLS0vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xABHEAACAQICBAoHBAcHBQEAAAABAgADEQQhEjFRYQUGE0FxgZGhsfAHIjJSwdHhFEJikhYjQ1NUcqIVM0SCk+LxJCU0wtIX/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QALREAAgIBAgQEBQUBAAAAAAAAAAECERIDBBMhMUEUIlGhUmGR4fAFMkNxgVP/2gAMAwEAAhEDEQA/AM5BDKJFVhVWdVnHRJVhQsiqyaiKx0SCyYWISYgFDBZMCOsIogMgBJgSYWSCRBRELJBZILJARDIASQEIFkgkkYMLH0YQJJcnAoDoxaMOFiKxUOwGjFow2jGtCgsCRIkQ5WR0I6EBIkSJYKSDJACuRIMIdkgmEpCAkSDCGIkGEYiu4gXMtMJWqrGhFdmgmqQjiV2WaUS2M1SV6laEZZXdLx0TY32iKAOGbmI7D84ohm+sMiwKIYZAZlZdBVSTCSK3hVvFY6GCmSAkgZMGOwogBJgSYhAIWFEFvCAmSVJNUhYURDSUmKe6EFCFoKYGSBh1w26FXCRZIeLKgYySsZcGDkhhIs4lYMqgGOBLi4eSGHk5oeBnssiVM0+RiNEQ4gYGUVMYqZqGhIHDw4iDAzM9kbOaRoRjRhmgwM4qdkFUSahpwb0oZDxMoiRamZoNSkGpx5k4mayQT05oskGyCNSFiZb0t0rtTOyazUxBtRlZixMZkgjTmw+HErvQjzJxM/kxHlnRPu+HziiyDEIjw6NJrREIKEyzRriMjwqmMtGFWhDNBix1AhAojph98MuGO2LNFYkUpiGWiNskuGMPTomLMeIJcPvhFw55jLC0jCLSMWYYgkpGHSnujrTMIAdgich0JUkwsVzskdMjmiHRPRj6MbTji8AoWjFox+2PYwsKI6MbRkr7owbdC0FMjoxisk9UDXHDA6oBQIpIlIcyJEBFZkgmEtNaCdRFY6KrJAPTll6WyAcESrCiq6QDgy2xgn6Y1IloqEyDNCusEySrFQMmDYyVQESlia+jn0X3dOyO0Kg5tFKiYxCL6QG68UVio11EKomIvGTD+835WljC8P0G+/o/zC0ww1Phf0NsoeqNlVh0SVcLiEf2HVv5SD4S6gmTnXU0USaJLCJBpDpBTE0SVIZUkUhkE0TshiVZMCOBJBZaJGAkgI4ElaUAwEe0ePaAEdHdFoydoouQWc5x34x/YMNyqoHqO3J01Ps6RUtpPbPRAXUNZIGV7jhOK/pKxL4unTxAR6dWotP1UCshchVK21i5Fwbm152HpR4NqV+DyKYuadRarDnKqGUkbLad+gGeR8VuC6tTH4ZFUq3LU2uRqFNuUZs9gQm26MZ9EWkSghDFaIVldsMDBthjzNLdo1oUPJlQUGH3pIq26WZEiFBZTIbYO2Qa/uy6ywTJ0yGhplNqre7K9Ss1/YMvspgaqHyJORaSM2pVv93tlOst+a0vYinnr7jKlak3NeXGaCUSoXtzx+VG2SdDzjuguS8maNxZnixqldQMyBOb4RxJudBrrbn0fjrAyzvleblXBDn7iR4SFTBJYiwHOeYnLduicooMZHGtUYH2X6l0h+YNYxTpGekDa6nv74os4hizjaBF8zaXGsALHMd4mEuM3Q6Y3aJ6cdWJxuDNanUtmMiNRGvtmnQ4YrgWFV+s37zOep41d8tUsUp55fkl1pi8y6HWYfjLXC2up3lc+7Lul/g/jM4yqAONuQbuyM5CnVG2WadSS9rotNYoONqJ9T0bC8O0W+9on8Qt36pr0qgIuJ5ZTqy7h8YV9livPkSJyz/Tvgl9TWO6+JHpqtCAzhcBxuK2DOjjpAbtHxmn+nODBsahByv6pI9b8QynJqaWrpfuV/1zN4yjPodUI4E59uOWCC6XLqcgbC5bM29kZ3mf/wDo+Dvb9bbbofC8UZN9n9GNqjsbRTl8Fx+wVQ2NQp/OpUdGlqnRYbGU6gvTdXG1WB8IZrvy/vkGLDStwlj6eHpNWrOEpoLsx7AABmSSQABmSYY1VBsWAPSJ576acYBhKFMN7dcsQDrWnTYG+7SdIKUW6TCmc5xr9IK4twi03Wguq5F2b3nQZZc2Z75zn9oLe4qAdHq+TMAmNN46skqM3BN2eq8RuP8ARog0MVVqWLXSq2lUpqCANEkksouL3tbo5/UlOkAwYEEXBGYIOogg5ifLIM9g9CWO0sPXoEk8nUVwCfVVai2AQc12RyekbZjNpu2aI9IVLc8ZweY90nItUAsCRnq388mVRXN0CbbA6L7e6Ts20SAxlM5aa5b4Soyra5AubC5AuTqA3zOM4Stxkn/pclJdV7DaPRIuIQrIMu+U+SIKzuR90wTVDsMsuN8rum+c85tGsaKtZz7t5UYnVokdsuvTHP8AGVqlFdneZlxkupskuxXen1dcr1LfW8NUw67D2ylWw6DVftlLWh3b/P8ASlpyfRFfEBBnyhA7R3iZuIp0WuXqaQ2XyzHhLmJoIwsXAvqGRB6LjOZT8GANpK4Vb39a+jqOeuacbSfWTFwdTskQNLDDIBD/AJ/90UGcUOZyd66OjlsuLx5eWn8TIw1PRHn+idh7JIT0tFh0SelyPPtnl4aE0xtE9SWkNg7IVaC+6OwQySGk2eUitvhVxRGo989VXCJ7i/lEIvB9M/s0/KJPGSK4bZ5ZT4Rf3j2wdXGv7xznri8E0T+yp/kX5ST8XMK9tKjTy2KB4SJbpepS28vQ8dpVMoRXnslHivgwLfZ6Z6UBPac4T9GMF/DU/wAgmXjNNdS/DzPGC8lcT2Y8V8D/AAqflEGeLOA/hV7PrF4/SQeGm+h48I9KsVIKkgjUQbEdYnr36NYD+F8fnBHihgD/AIZvzv8AOS/1HQ9R+F1Eec0+MmIGuqWtb2rHVla+uZvGjhipiWQvb1VNgBYDSOduf7onqNTijgb/APjv/qP855RxvFJcZVSgpWnTbkwCSxuoAe5P4tKZaWptdSd6SWS+VGup4iMEpvy/2Y4iiEU6jnFNXi9wrVw9QmlUZCQL6JtfRNwDtGZmVN7idwI2JxC30lpKTyji1x6psq31tmOgHovnqShGLc+i9S4RlKVQ6m9S4741XL8uTe91YApq5l5uqLF8dK1TRyVWUawTz6yATledGnErCgEctiOfWKZ+Eo4zizhEyNasCfwIfC04+NsdWS6No6oae607cUznODuHnplyWYls7kk57enmvFi+Mdd7frXstQOgJ9mwIFh0GXf7EwbE2xNUW13ofWG/RnCWH/WVMzo/3B19vfOjHbKWTSt/InLcuCjzpGvwZ6Q6hJNSx1+rkBbKwBPPrnbYHhlKqXDC/OL9c87p8SKBOWLb/SPjebWA4l0UB0K757QL+E53HbOVR1K9y5LVx82lz9eh1z4obe+BfFDbOdfioP37dglapxT2Yhuz6x+H27/l9vuQnNfx+/2OmavAPX3zmm4rONWJbs+sBU4r1D/iCf8AL/ujW02//X2+5fFmv4n9fsdDXx1Ma6ij/MJnV+GKC/tL9GkfCY78V6n7/wDp/wB0BU4sVf3y/lPzmsdnte87+gnutddIV9fsHxXGOlawZgOe6326hYknpt8Jm0+FabOGflWC6i1sycwAlwBbKzEXGoWifitWv/eJttnr7IKpxZr/ALyn3/Kax222Xf3MpbncPt7GmOM1LmRrdA+cUxG4sYj30/M3yij8PtvT3F4ncfiOqRodDKSNLCNLyOei4jQytK1Mw6zNyNEg6tCJUglWFprMmzVIsI8OjmDpU5ap0pzyZvEJSYw4JiRIZVnM02OU0QuY2csqkmqRcKTI4iRVUGHWmdkMEhFE1htm+rMpapW5LPV3T594MwZx2MrvayaOKxLljYIujUdS5H4yg+k+jQJ5d6OOBk08dh3QijXUqgLesUpVKlOouR0ho8ogN9o1g59ejorTuu5GTl/h5KBFO99I2EoU8e1OlRp01SnTGiiqguV0ybKNfrDPdunJPo+6B1fGdlcrMTPnsnoZwQ+xu5sdKs5GWrRVF+B7RPKNEDmE909GJU8GUSFAzqA2AFyKrgk7Tla+6c+401NKL6WaQljdHSHDLnkOyZmL4PBPsjUeabN4OoJ5+52WnJeU10tecHyZyw4MGfqjXsEPX4LU6PqjXsE2GUX3ed0k+dt085bV8+Z3PeTdGWmAF76I7BLK0QBqlqQczWOgo8zGWvOfUqvTld6ctOZXcysWXCTKzJBOsO7QDNHizojNgHSAdJYdoF3mkVIpzRWenK705bZoBzNVkZuSKpQ+bxQulFK8wsolNFPMR2WlmmnX1wKsN8sUz1z0TyCxTXz9YdBAU23EQyOJm0zRMsqkPTXfKqVIZakjFlqSLtK0tUmEzkq9EOlXf3/WQ4F5mihhVMoo58/UQy1d/nqkYCbsuqYRWlMVfOvwk1rjb8PGUkQ0XAZIGVlqjpkuUmilRLiWLyhguCKdGtVq07ryx0nS/qcofaqKPus1l0rZHQU2uJY5XdHFbceyWpommeNelBbcJVTY5rS6D+qQXG7K3VOOaei+l9F5ei9s2pFScr+o5Iyv+I+ROK4u4IYjF0qDaVqjMvq6wdBtE9AIBO4GdCflsjuZtp7j6M2/7XRtqvW7eXqXnhakjXcHnGqx2Ge6+jjFhuDKAyuvKKbZ5iq+sawcwevZaZa37So9Tp9E75F06Y3Lgf8ABkDiRtHX9ZyuMaNFY1vOUdpA1Qecdsi1cWmeKL5sRMHUaDbEdPZK9Sv09gkYGiQRngXeCauYCpUlLSLySFVeVmqSNSpK71JvHRIlqhnqQTNK9Sr5vIGrz2+M04NGb1gjGReVzVGuM1bf4/KD02LiBCYoDl/N4pODHmU0rk8/fLKVTvPnpmQtX8XjDU6p2ztxOLI2Kdfz5MOtS/OPPTMlHMsI8MEPI00qbx2D5wyVejtA8Zmo/nOFWpFgPI0hX3jv+Emtbz/zM9XhA++LBFZGilQbbdQhRV3t2TMFTf3yQq7/AD1RcMeZqpif5u6HXFDaR56JkLX3w6YjeJD0ylM0GxA29v1BjivfIMeo/KUOU6I6mLAeRofamH3u2/wkkxRvmQez4i8oaUfS85xYIdnI+lLAVH0MQGBVFFNlNwQSxIZdoN7HVqGu+WH6NcuEUb3adU5Zfd0dYP4t86/jtngau7QOr8aj4zjPR/Vtj13pUH9Ol/6iaJeSiH+4zuNeBNHG1lOpqjVFO1KhLr2Xt0qZ6T6PGRcAmiDdmcvdibuDoX1ZCyrlzb9Z530o07/Z6nP+sQnnPsMo6vX7Zd9GtUnCuDzV2t0cnTJ6rkxSWUBrlI7R8Wb5aQHST3Gwk/tW89iX6yBKZPTET098ycEXZaNbzYHvMapVGweHxtK2nIu8XDKyCsxPMPPXAM3nOQZ4FnlKBLmGY7pXdtwjFoJmlKBLmMxlerCs0BUM0SIbBMfOUizWGrwkKzZfS/dKlbEqFN2tlv8AgZTJsEcTotYkdu7aYSpVyJFpk8IPqKt2X+MrU+EGvZnbrVfGKhmr9o8+THlFqybQd5Iv4xo6FYyNLCPM9Gh0qTYxNFHh0qTNWpDK8KA0kqecoUVpmq0IrQoVmiKwhFqiZ4aGV/OuVQWXlqQivKIeEVoUFl1anTCCsNt+r6ykHMkG6O2LErIvLVXd4fGHRm5vH/mZgqbhHvJcBqRqab9HZFy21v6vpM4AbR8YQNsJPVl4yXApSI8P+tha40v2TnXsBPwnB8RqgGOS5Ga1ALm2eiT4AztqmKDKwOiRmLZesCoJt+a04PivTNPErUcaKoHuWysSpHbmREo2rQ7p8zqvSNQJw6P7j259TjXs1qBntjejiofs1QAZcsc9pNNLjqsO2B4dxlPEYfQpve7DPMD1TqPnZC8V2FOhyam5ViTkbesdZte30j4bxvsGas6ss2zwPwkTVbb3SgcaBqqJ0ZDxEcYu/OOofIycB5Fzl9/dGNbzqlP7SdVyer6xGtuPdDAMi0asGzyu1YbWHnfANWG09vyEMBZFwvBs8q8tsF+s/GDbFdHaL90eIsiyzwDtKtTEnnC23nKV/tC847NJh4R4istVqmWdpm10B3c/PbLoEJUdddx06IJ+cr6Rz9dt3sgeF4UFlTEKLe1e2y4Mp06Rve559ZtLOKG0N16Fu6U1qH7rKN1iOq4hQ7BtSz1p2mKFNV9nfFFQWOtSFWrKSmEUzQgvLVhUqSiphVaMRfR4UVJnh98ny4Gth2xio0FN4VT5sJQo1NL2QzdAJHba0Pp6PtFV/mdfgSe6JyiurGot9EXkfee2GFWZJx9Ia6gP8oJ8bSFThmmNSO3S2iP6M++LiLsPhvua9XEkC9hbaWCjtzjBqzaky2gsw6m0QJztbhqpe6JSS2pvWL/m0s5VxGPqv/eVXbaNIhewGQ5zfb8/PmWoRXf8/PkbGPxuJp2s1Oxz9a+l0N6xt2X3SvV4Wrfcqk5aggXPcxOrXzfOZPLW1Aed8i1aLn3Y6XZF9uEcSQdKoBvI0iOgG9pVrNVcHSrM265tz9nPAGod0ReFILZq4PhFKS2WlomwDMLMzW2k827VAYjhQMCAhz5ybdeQlAtIzdasqoz4cbsI9Ukg3NxqsSLW2RGoT7RJ8OyQ65MC8youyYMQG4QeQ5+yOz7oqHYue94jWJyPeZBm2xrm8QwlCu9M3pvoHntz9N8j1y/S4crjW4bpH/zbumaxts7YM1L7uv4QEbj8YH16Cg7bt8TINxhqHWq94MxesGRLbuuO2FI1m4cf3V/q+ciOGSfaXLcT4XmTeMWhbFSNU8JLs7RceMj/AGgGGodeRmTaMTDIMTQfEnUCB0WHhANVJ1uvZ8bSoY0Vjosmt+LvaKVbxRAX0rDbJ8sNvjFFKTE0T07C51RzikGts9wP0iik5MeKB/bQPugjzzR14WI9lVG+2ffFFBtgkhqvCFR/adui+XdBCpFFBDEakcPFFGA+nGvFFAQ94tKKKMQuUkSxHR4RRRgSU5XkywiijQhi8jcxRSbGLSiiiiAe9pHTvFFAY1ozVIooAQJvFeKKAEC0a4iiiAYmRiigAxkCYooDI2MUUUQH/9k="
              className="profile-img"
              alt="Profile"
            />
            <div className="user-name">John Doe</div>
          </div>
        </>
      )}
      <nav className="navbar">
        <a href="#" className="logo">
          Veriprod
        </a>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation"
          onClick={Toggle}
        >
          {open ? <IoCloseSharp /> : <FaBarsStaggered />}
        </button>
        <ul className={`nav-links ${open ? "active" : ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/addproduct">Add Product</a>
          </li>
          {!token && (
            <>
              <li>
                <a href="/Login">Login</a>
              </li>
              <li>
                <a href="/SignUp">Sign Up</a>
              </li>
            </>
          )}
          {token && (
            <li>
              <a onClick={LogOut} className="LogoutBtn">
                LogOut
              </a>
            </li>
          )}
          <li>
            <img
              src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
              className="profileImageNav"
              alt="Profile Image"
              onClick={toggleProfilePopup}
              style={{ cursor: "pointer" }}
            />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
