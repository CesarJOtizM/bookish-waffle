import React from 'react'
import styles from './error.module.scss'
import errorImg from '../../../../assets/img/Error.svg'
import { Phone, Mail, MapPin } from 'feather-icons-react'
import Image from 'next/image'

const Error = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Image
          src={errorImg}
          alt="Imagen de error"
          width={147}
          height={154}
          priority
        />
        <div className={styles.text}>
          <h3>Lo sentimos</h3>
          <p>
            Pero su perfil no es elegible para una pre-oferta, no te desanimes,
            aún puedes contactarnos y evaluaremos tu situación para saber que
            servicios se adaptan a tu perfil
          </p>
        </div>
      </div>
      <div className={styles.contactInfo}>
        <h1>Contáctenos</h1>
        <div className={styles.info}>
          <div className={styles.item}>
            <Phone size={18} color="#69E8D9" />
            <p>(656) 257 1720</p>
          </div>
          <div className={styles.item}>
            <Mail size={18} color="#69E8D9" />
            <p>info@bordercredit.com</p>
          </div>
          <div className={styles.item}>
            <MapPin size={18} color="#69E8D9" />
            <p>
              Av. López Mateos 135 N. Piso 2 Oficina 1720, Col. Pronaf C.P.
              32315
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
