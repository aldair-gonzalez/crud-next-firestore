"use client";

import Loader from "@/app/components/Loader";
import {
  getAlumnoById,
  getClaseById,
  getInstrumentoById,
  getProfesorById,
  getRolById,
  getUsuarioById,
} from "@/lib/firebase/crud/read";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const alumno = await getAlumnoById(id);
      if (alumno !== null && alumno !== undefined) {
        alumno.profesor = await getProfesorById(alumno.profesor.id);
        alumno.profesor.usuario = await getUsuarioById(
          alumno.profesor.usuario.id
        );
        alumno.profesor.usuario.rol = await getRolById(
          alumno.profesor.usuario.rol.id
        );
        alumno.profesor.instrumento = await getInstrumentoById(
          alumno.profesor.instrumento.id
        );
        alumno.usuario = await getUsuarioById(alumno.usuario.id);
        alumno.usuario.rol = await getRolById(alumno.usuario.rol.id);

        const asistencias = alumno.asistencias;
        for (const asistencia of asistencias) {
          asistencia.clase = await getClaseById(asistencia.clase.id);
          const fecha = new Date(asistencia.clase.fecha.seconds * 1000);
          asistencia.clase.fecha = `${fecha.getDate()}/${
            fecha.getMonth() + 1
          }/${fecha.getFullYear()}`;
          asistencia.clase.profesor = await getProfesorById(
            asistencia.clase.profesor.id
          );
          asistencia.clase.profesor.usuario = await getUsuarioById(
            asistencia.clase.profesor.usuario.id
          );
          asistencia.clase.profesor.usuario.rol = await getRolById(
            asistencia.clase.profesor.usuario.rol.id
          );
          asistencia.clase.profesor.instrumento = await getInstrumentoById(
            asistencia.clase.profesor.instrumento.id
          );
        }
        const deudas = alumno.deudas;
        for (const deuda of deudas) {
          const fecha = new Date(deuda.fecha.seconds * 1000);
          deuda.fecha = `${fecha.getDate()}/${
            fecha.getMonth() + 1
          }/${fecha.getFullYear()}`;

          const pagos = deuda.pagos;
          for (const pago of pagos) {
            const fechaPago = new Date(pago.fecha.seconds * 1000);
            pago.fecha = `${fechaPago.getDate()}/${
              fechaPago.getMonth() + 1
            }/${fechaPago.getFullYear()}`;
          }
        }
        setData(alumno);
      } else setData(null);
      setLoading(false);
    })();
  }, [id]);

  return (
    <div className="w-full flex items-center justify-center flex-col gap-10">
      {loading ? (
        <Loader />
      ) : data !== null ? (
        <>
          <h1>Alumno</h1>
          <div className="w-full grid grid-cols-2 gap-5 place-content-center place-items-center">
            {data.usuario ? (
              <ul>
                <li>{data.usuario.nombre}</li>
                <li>{data.usuario.apellido}</li>
                <li>{data.usuario.email}</li>
                <li>{data.usuario.telefono}</li>
                <li>{data.usuario.rol.nombre}</li>
              </ul>
            ) : (
              <p>No se encontró al usuario</p>
            )}
            {data.profesor ? (
              <ul>
                <li>{data.profesor.usuario.nombre}</li>
                <li>{data.profesor.usuario.apellido}</li>
                <li>{data.profesor.usuario.email}</li>
                <li>{data.profesor.usuario.telefono}</li>
                <li>
                  {data.profesor.usuario.rol
                    ? data.profesor.usuario.rol.nombre
                    : "No se encontró el rol"}
                </li>
                <li>
                  {data.profesor.instrumento
                    ? data.profesor.instrumento.nombre
                    : "No se encontró el instrumento"}
                </li>
              </ul>
            ) : (
              <p>No se encontró al profesor</p>
            )}
            {data.asistencias.map((asistencia) => (
              <ul key={asistencia.id}>
                {asistencia.clase ? (
                  <>
                    <li>{asistencia.clase.fecha}</li>
                    <li>{asistencia.clase.hora_inicio}</li>
                    <li>{asistencia.clase.hora_fin}</li>
                    <li>{asistencia.clase.status}</li>
                  </>
                ) : (
                  <li>No se encontró la clase</li>
                )}
                <li>{asistencia.estado}</li>
              </ul>
            ))}
            {data.deudas.map((deuda) => (
              <ul key={deuda.id}>
                <li>{deuda.fecha}</li>
                <li>{deuda.monto_total}</li>
                <li>{deuda.estado}</li>
                {
                  deuda.pagos && deuda.pagos.map((pago) => (
                    <ul key={pago.id}>
                      <li>{pago.fecha}</li>
                      <li>{pago.monto_pagado}</li>
                    </ul>
                  ))
                }
              </ul>
            ))}
          </div>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      ) : (
        <>
          <h1>Alumno</h1>
          <p>No se encontro el alumno</p>
          <button onClick={() => router.back()}>Regresar</button>
        </>
      )}
    </div>
  );
};
export default Page;
