"use client";
import styles from "../app/home.module.css";
import { useState, useEffect } from "react";

type FormErrors = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  telegram?: string;
  api?: string;
};

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.containerElemAtHeader}>
            <p className={styles.textAtHeaderApper}>18 березня</p>
            <p className={styles.textAtHeader}>Живий вебінар</p>
          </div>

          <div className={styles.containerElemAtHeader}>
            <p className={styles.textAtHeaderApper}>18:00</p>
            <p className={styles.textAtHeader}>за Києвом</p>
          </div>

          <div className={styles.containerElemAtHeader}>
            <p className={styles.textAtHeaderApper}>Безкоштовно</p>
          </div>
        </div>

        <h1 className={styles.mainText}>
          Чому <span className={styles.highlight}>90%</span> новачків у контенті не  
          заробляють і як вийти на свої 1000$ 
          за <span className={styles.highlight2}>2 місяці</span>
        </h1>

        <div className={styles.personPhotoContainer}>
          <div className={styles.personPhotoAtRight}>
            <div className={styles.glowCircle}></div>

            <img src="/disco-ball.png" alt="disco ball" className={styles.ball} />


            <img src="/heart.png" alt="heart" className={styles.heart} />

            <img src="/person.png" alt="person" className={styles.person} />
          </div>
        </div>

        <div className={styles.subButtonContainer}>
          <button className={styles.subButton} onClick={() => setIsOpen(true)}>
            ЗАРЕЄСТРУВАТИСЯ БЕЗКОШТОВНО
          </button>
        </div>

        <div className={styles.webinarBlock}>
          <p className={styles.webinarIntro}>Цей вебінар для тебе, якщо:</p>
          <ul className={styles.webinarList}>
            <li className={styles.webinarListElem}><span className={styles.boldIntro}>ти хочеш</span>заробляти на контенті, але не розумієш, з чого почати</li>
            <li className={styles.webinarListElem}><span className={styles.boldIntro}>ти вже щось знімаєш,</span> але грошей з цього немає</li>
            <li className={styles.webinarListElem}><span className={styles.boldIntro}>ти боїшся</span>писати брендам і називати ціну</li>
            <li className={styles.webinarListElem}><span className={styles.boldIntro}>ти думаєш,</span> що без великої аудиторії в контенті немає грошей</li>
            <li className={styles.webinarListElem}><span className={styles.boldIntro}>ти втомилась</span> від безкоштовних тестових і «давайте спробуємо»</li>
          </ul>
        </div>

        {isOpen && (
          <div className="container">
            <div className={styles.modalOverlay}>
              <div className={styles.modal}>
                <h2 className={styles.modalTitle}>Заповни дані</h2>

                <form
                  className={styles.form}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setErrors({});
                    setLoading(true);

                    const formData = new FormData(e.target);

                    const data = {
                      firstName: String(formData.get("firstName") ?? "").trim(),
                      lastName: String(formData.get("lastName") ?? "").trim(),
                      phone: String(formData.get("phone") ?? "").trim(),
                      telegram: String(formData.get("telegram") ?? "").trim(),
                    };

                    const newErrors: FormErrors = {};

                    if (!/^[А-Яа-яA-Za-zЇїІіЄєҐґ']{2,}$/.test(data.firstName)) {
                      newErrors.firstName = "Введіть коректне ім’я";
                    }

                    if (!/^[А-Яа-яA-Za-zЇїІіЄєҐґ']{2,}$/.test(data.lastName)) {
                      newErrors.lastName = "Введіть коректне прізвище";
                    }

                    if (!/^(\+380\d{9}|0\d{9})$/.test(data.phone)) {
                      newErrors.phone = "Формат: +380XXXXXXXXX або 0XXXXXXXXX";
                    }

                    if (!/^@[a-zA-Z0-9_]{2,}$/.test(data.telegram)) {
                      newErrors.telegram = "Telegram має починатися з @";
                    }

                    if (Object.keys(newErrors).length > 0) {
                      setErrors(newErrors);
                      setLoading(false);
                      return;
                    }

                    try {
                      const res = await fetch("https://script.google.com/macros/s/AKfycbxgc6CVDRlKBYBlAh2IA7DQ8VAk4Jtt5QRoPAiv-6YWM16rhiDMPauwdBlKXRyo4D0qJg/exec", {
                        method: "POST",
                        body: JSON.stringify(data),
                      });

                      const result = await res.json();
                      console.log(result)

                      if (result.result !== "success") {
                        throw new Error("Server error");
                      }

                      window.open("https://t.me/+jBOLV1GAsiE4ODYy", "_blank");

                    } catch (err) {
                      setErrors({ api: "Помилка збереження. Спробуйте ще раз." });
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  <input name="firstName" placeholder="Ім’я" />
                  {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}

                  <input name="lastName" placeholder="Прізвище" />
                  {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}

                  <input name="phone" placeholder="Номер телефону" />
                  {errors.phone && <span className={styles.error}>{errors.phone}</span>}

                  <input name="telegram" placeholder="Telegram (@username)" />
                  {errors.telegram && <span className={styles.error}>{errors.telegram}</span>}

                  {errors.api && <span className={styles.error}>{errors.api}</span>}

                  <button type="submit" className={styles.subButton} disabled={loading}>
                    {loading ? "ЗБЕРЕЖЕННЯ..." : "ПЕРЕЙТИ В TELEGRAM"}
                  </button>
                </form>

                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={styles.newBackgroundSection}>
        <div className={styles.contentInside}>
          <h2 className={styles.sectionTitle}>На вебінарі<br /> ми розберемо:</h2>
          <ul className={styles.topicList}>
            <li>
              <strong>Чому контент ≠ блогінг</strong><br />
              І як заробляють ті, у кого 300–500 підписників
            </li>
            <li>
              <strong>Які навички реально продаються</strong><br />
              Зйомка, монтаж, UGC, брендовий контент — що обрати новачку
            </li>
            <li>
              <strong>Де новачки зливають час і гроші</strong><br />
              І як не зависнути в «я вчуся, але не заробляю»
            </li>
            <li>
              <strong>Реальний шлях до перших 1000$</strong><br />
              Не за пів року, а за 2 місяці — по кроках
            </li>
          </ul>
        </div>
      
        <div className={styles.subButtonContainer}>
          <button className={styles.subButton} onClick={() => setIsOpen(true)}>
            ЗАРЕЄСТРУВАТИСЯ БЕЗКОШТОВНО
          </button>
        </div>
       
      </div>  

      <div className="container">
        <div className={styles.afterWebinarBlock}>
          <h3 className={styles.afterWebinarTitle}>
            Після вебінару в тебе в голові з’явиться чітка картинка:
          </h3>

          <div className={`${styles.afterItem} ${styles.item1}`}>
            Як реально заробляють контент-мейкери
          </div>

          <div className={`${styles.afterItem} ${styles.item2}`}>
            За що платять бренди, а за що ні
          </div>

          <div className={`${styles.afterItem} ${styles.item3}`}>
            Які формати приносять гроші навіть новачкам
          </div>

          <div className={`${styles.afterItem} ${styles.item4}`}>
            Як вийти на перші 500–1000$, а не чекати роками
          </div>
        </div>

        <div className={styles.subButtonContainer}>
          <button className={styles.subButton} onClick={() => setIsOpen(true)}>
            ЗАРЕЄСТРУВАТИСЯ БЕЗКОШТОВНО
          </button>
        </div>
      </div>
    </>
  );
}