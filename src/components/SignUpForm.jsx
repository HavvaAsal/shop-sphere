import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function SignUpForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Roller API'den alınır
    axios.get("https://workintech-fe-ecommerce.onrender.com/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Role id'yi izleriz
  const selectedRole = watch("role_id");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // "passwordValidation" verisini göndermeyiz, sadece "password" göndeririz
      const { passwordValidation, ...dataToSend } = data;

      // Kayıt verisi API'ye gönderilir
      await axios.post("https://workintech-fe-ecommerce.onrender.com/signup", dataToSend);
      alert("Hesabınızı etkinleştirmek için e-postadaki bağlantıya tıklamanız gerekiyor!");
      window.history.back(); // Önceki sayfaya dönülür
    } catch (err) {
      setError("Bir hata oluştu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Ad Alanı */}
      <div>
        <label>Ad:</label>
        <input
          type="text"
          {...register("name", { required: "Ad gereklidir", minLength: 3 })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      {/* E-posta Alanı */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register("email", { required: "E-posta gereklidir" })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      {/* Şifre Alanı */}
      <div>
        <label>Şifre:</label>
        <input
          type="password"
          {...register("password", {
            required: "Şifre gereklidir",
            minLength: 8,
            pattern:
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      {/* Şifre Doğrulama Alanı */}
      <div>
        <label>Şifre Doğrulama:</label>
        <input
          type="password"
          {...register("passwordValidation", {
            required: "Şifre doğrulaması gereklidir",
            validate: (value) => value === watch("password") || "Şifreler uyuşmuyor",
          })}
        />
        {errors.passwordValidation && <p>{errors.passwordValidation.message}</p>}
      </div>

      {/* Rol Seçimi */}
      <div>
        <label>Rol:</label>
        <select {...register("role_id", { required: "Rol seçilmelidir" })}>
          <option value="">Bir rol seçin</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        {errors.role_id && <p>{errors.role_id.message}</p>}
      </div>

      {/* Mağaza Detayları (Eğer rol "store" seçildiyse) */}
      {selectedRole === "2" && (
        <div>
          {/* Mağaza Adı */}
          <div>
            <label>Mağaza Adı:</label>
            <input
              type="text"
              {...register("store.name", {
                required: "Mağaza adı gereklidir",
                minLength: {
                  value: 3,
                  message: "Mağaza adı en az 3 karakter olmalıdır",
                },
              })}
            />
            {errors.store?.name && <p>{errors.store?.name.message}</p>}
          </div>

          {/* Mağaza Telefonu */}
          <div>
            <label>Mağaza Telefonu:</label>
            <input
              type="tel"
              {...register("store.phone", {
                required: "Mağaza telefonu gereklidir",
                pattern: {
                  value: /^(\+90|0)?5\d{9}$/, // Türkiye telefon numarası deseni
                  message: "Geçerli bir Türkiye telefon numarası girin",
                },
              })}
            />
            {errors.store?.phone && <p>{errors.store?.phone.message}</p>}
          </div>

          {/* Mağaza Vergi Kimlik Numarası */}
          <div>
            <label>Mağaza Vergi Kimlik Numarası:</label>
            <input
              type="text"
              {...register("store.tax_no", {
                required: "Vergi kimlik numarası gereklidir",
                pattern: {
                  value: /^T\d{4}V\d{7}$/, // Vergi kimlik numarası deseni
                  message: "Geçerli bir vergi kimlik numarası girin (TXXXXVXXXXXX)",
                },
              })}
            />
            {errors.store?.tax_no && <p>{errors.store?.tax_no.message}</p>}
          </div>

          {/* Mağaza Banka Hesabı */}
          <div>
            <label>Mağaza Banka Hesabı:</label>
            <input
              type="text"
              {...register("store.bank_account", {
                required: "Banka hesabı gereklidir",
                pattern: {
                  value: /^[A-Z]{2}\d{2}[A-Z0-9]{11}$/, // IBAN deseni
                  message: "Geçerli bir IBAN adresi girin",
                },
              })}
            />
            {errors.store?.bank_account && <p>{errors.store?.bank_account.message}</p>}
          </div>
        </div>
      )}

      {/* Gönder Butonu */}
      <button type="submit" disabled={loading}>
        {loading ? "Gönderiliyor..." : "Gönder"}
      </button>

      {/* Hata Mesajı */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
