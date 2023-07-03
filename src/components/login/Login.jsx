// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import "./Login.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import imagenLogoGoogle from "../../icons/Google-Sign-In.png";
import logoEmpresa from "../../icons/logoCuadrado.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../../redux/features/task/login";
const Login =()=> {
    const loginFailureMessage = useSelector((state) => state.login.error);
    const dispatch = useDispatch();
    let logoRef = useRef(logoEmpresa);
    const usuarioInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [popupStyle, setPopupStyle] = useState("hide");
    const popup = (usuario, password) => {
        handleAcceder({usuario, password});
    };
    const [ user, setUser ] = useState(null);
    const [ profile, setProfile ] = useState(null);
    const login = useGoogleLogin({onSuccess: (codeResponse) => setUser(codeResponse),onError: (error) => console.log('Login Failed:', error)});
    const handleAcceder = async (buscar) => {
        console.log("handleAcceder: buscar", buscar);
        let {usuario, password} = buscar;
        console.log(usuario, password);
        try {
            if (usuario && password) {
                let response = await axios.post("http://localhost:3001/usuarios/search", {usuario, password});
                if (response.data.length > 0) {
                    const {usuario,password}=response.data[0];
                    if (usuario && password) {
                        usuarioInputRef.current.value = usuario;
                        passwordInputRef.current.value = password;
                        dispatch(loginSuccess(response.data[0])); // Almacena response.data[0] en el estado global
                        navigate("/app");
                    }
                } else {
                    console.log("Error: Usuario o contraseña incorrectos");
                    dispatch(loginFailure("Error: Usuario o contraseña incorrectos")); // Disparar la acción loginFailure con el mensaje de error
                    setPopupStyle("popup-error");
                }
            }else{
                console.log("Error: Usuario o contraseña Vacios");
                dispatch(loginFailure("Error: Usuario o contraseña Vacios")); // Disparar la acción loginFailure con el mensaje de error
                setPopupStyle("popup-error");
            }
        } catch (error) {
            console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
            dispatch(loginFailure("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde")); // Disparar la acción loginFailure con el mensaje de error
            setPopupStyle("popup-error");
        }
    };
    const navigate = useNavigate();
    useEffect(() => {
        const getUserData = async () => {
            console.log("Entro al getUserData", user);
            if (user) {
                try {
                    let res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,{
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }}
                    );
                    setProfile(res.data);
                    logoRef.current.setAttribute("src", res.data.picture);
                    console.log("profile",res.data)
                    try {
                        console.log("Entro")
                        let response = await axios.post("http://localhost:3001/usuarios/search", {email: res.data.email});
                        if (response.data.length > 0) {
                            const {usuario,password}=response.data[0];
                            if (usuario && password) {
                                usuarioInputRef.current.value = usuario;
                                passwordInputRef.current.value = password;
                                dispatch(loginSuccess(response.data[0])); // Almacena response.data[0] en el estado global
                                navigate("/app");
                            } else {
                                console.log("Error: Usuario o contraseña incorrectos");
                                dispatch(loginFailure("Error: Usuario o contraseña incorrectos")); // Disparar la acción loginFailure con el mensaje de error
                                setPopupStyle("popup-error");
                            }
                        } else {
                            console.log("No existen Usuarios con ese correo, Desea Crear un Nuevo Usuario");
                            dispatch(loginFailure("No existen Usuarios con ese correo, Desea Crear un Nuevo Usuario")); // Disparar la acción loginFailure con el mensaje de error
                            setPopupStyle("popup-creacion-usuario");
                            console.log("profile",profile)
                        }
                    } catch (error) {
                        console.log("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde",error);
                        dispatch(loginFailure("Error: En la solicitud Backend, Servidor de Base de Datos NO Responde")); // Disparar la acción loginFailure con el mensaje de error
                        setPopupStyle("popup-error");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        getUserData();
    }, [user, navigate]);
    const handleCancelar = () => {
        setProfile(null);
        setUser(null)
        usuarioInputRef.current.value = "";
        passwordInputRef.current.value = "";
        setPopupStyle("hide");
    }
    const generaUsuarioPassword = (nombres, apellidos) => {
        let givenNameWords = nombres.split(" ").map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase());
        let formattedFamilyName = apellidos.replace(/\s/g, "");
        let usuario = givenNameWords.join("") + formattedFamilyName;
        let password = "";
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * usuario.length);
          password += usuario[randomIndex].toUpperCase();
        }
        console.log("userName",usuario,"password",password, {usuario, password});
        return {usuario, password};
    }
    const handleCrearUsuario = async () => {
        console.log("Entro handleCrearUsuario");
        try {
            console.log("Entro handleCrearUsuario profile", profile);
            let personalCreado = await (await axios.post("http://localhost:3001/personal", {email: profile.email, nombres: profile.name, urlFoto: profile.picture,TipoDocIdentidadId:1, telefonos:"", idHistorico:0,nroDocIdentidad:"",})).data;
            if (personalCreado) {
                console.log("personalCreado",personalCreado);
                let {usuario, password} = generaUsuarioPassword(profile.given_name, profile.family_name);
                console.log("generaUsuarioPassword",usuario, password);
                let usuarioCreado = await (await axios.post("http://localhost:3001/usuarios", {usuario, password, RolId:3, PersonalId:personalCreado.id, idHistorico:0, created:false})).data;
                if (usuarioCreado) {
                    console.log("usuarioCreado",usuarioCreado);
                    usuarioInputRef.current.value = usuarioCreado.usuario;
                    passwordInputRef.current.value = usuarioCreado.password;
                    dispatch(loginSuccess(usuarioCreado)); // Almacena usuarioCreado en el estado global
                    navigate("/app");
                } else {
                    console.log("Error: No se pudo crear en la Tabla Usuario");
                    dispatch(loginFailure("Error: No se pudo crear en la Tabla Usuario")); // Disparar la acción loginFailure con el mensaje de error
                }
            } else {
                console.log("Error: No se pudo crear en la Tabla Personal");
                dispatch(loginFailure("Error: No se pudo crear en la Tabla Personal")); // Disparar la acción loginFailure con el mensaje de error
                setPopupStyle("popup-error");
            }
        } catch (error) {
            console.log("Error BackEnd: En la creacion del Usuario, Servidor de Base de Datos NO Responde",error);
            dispatch(loginFailure("Error BackEnd: En la creacion del Usuario, Servidor de Base de Datos NO Responde")); // Disparar la acción loginFailure con el mensaje de error
        }
        setPopupStyle("hide");
    };

    return (
    <div className="page">
        <div className="cover">
            <h1>13 TIENDA ONLINE</h1>
            <img ref={logoRef} src={logoEmpresa} alt="Logo" className="logo" />
            <input ref={usuarioInputRef} id="usuario" type="text" placeholder="Username" />
            <input ref={passwordInputRef} id ="password" type="password" placeholder="Password" />
            <div className="login-btn" onClick={()=>popup(usuarioInputRef.current.value, passwordInputRef.current.value)}>Acceder</div>
            <div >
                <button className="google-login-btn" onClick={() => login()}>
                    <img src={imagenLogoGoogle} alt="Iniciar sesión con Google"/>
                </button>
            </div>
            <div>
                { (popupStyle === "popup-error") && (
                    <div className="popup-error">
                        <h3>{loginFailureMessage}</h3>
                        <div>
                            <button onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </div>
                )}
                { (popupStyle === "popup-creacion-usuario") && (
                    <div className="popup-error">
                        <h3>{loginFailureMessage}</h3>
                        <br /><br />
                        <div>
                            <button className="boton-crear-usuario" onClick={handleCrearUsuario}>Crear Usuario</button>
                            <br /><br /><br />
                            <button className="boton-cancelar" onClick={handleCancelar}>Cancelar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};
export default Login;