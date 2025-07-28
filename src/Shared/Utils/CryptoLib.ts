import crypto from 'crypto';

class CryptoLib {
    
    /**
     * Descifra datos desde una cadena Base64
     * @param {string} value - Datos cifrados en Base64
     * @returns {string} - Datos descifrados
     */
    decryptData(value: string) {
        try {
            const dataTemp = Buffer.from(value, 'base64');
            return this.decryptString(dataTemp);
        } catch (error) {
            return '';
        }
    }

    /**
     * Cifra datos y retorna una cadena Base64
     * @param {string} value - Datos a cifrar
     * @returns {string} - Datos cifrados en Base64
     */
    encryptData(value: string) {
        try {
            const dataTemp = this.encryptString(value);
            return dataTemp ? dataTemp.toString('base64') : null;
        } catch (error) {
            return null;
        }
    }

    // #region Cifrar cadenas de caracteres

    /**
     * Cifra una cadena de texto
     * @param {string} data - Cadena a cifrar
     * @returns {Buffer} - Datos cifrados
     */
    private encryptString(data: string) {
        try {
            // Verificar que el dato no es nulo
            if (!data) {
                data = '';
            }

            // Obtener los bytes del string (usando UTF-8)
            const rawData = Buffer.from(data, 'utf8');

            // Cifrar los datos
            return this.encryptBinaryData(rawData);
        } catch (error) {
            return null;
        }
    }

    /**
     * Cifra datos binarios usando AES-256-GCM
     * @param {Buffer} data - Datos a cifrar
     * @returns {Buffer} - Datos cifrados con metadatos
     */
    private encryptBinaryData(data: Buffer) {
        try {
            // Generar clave e IV aleatorios para AES-256-GCM
            const key = crypto.randomBytes(32); // 256 bits
            const iv = crypto.randomBytes(12);  // 96 bits recomendado para GCM

            // Crear el cifrador AES-256-GCM
            const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
            cipher.setAAD(Buffer.alloc(0)); // AAD vacío

            // Cifrar los datos
            let encrypted = cipher.update(data);
            cipher.final();

            // Obtener el tag de autenticación (16 bytes para GCM)
            const authTag = cipher.getAuthTag();

            // Crear el buffer de salida con metadatos
            // Formato: [ivSize(1)] [keySize(1)] [tagSize(1)] [key] [iv] [authTag] [encryptedData]
            const outData = Buffer.alloc(3 + key.length + iv.length + authTag.length + encrypted.length);
            let offset = 0;

            // Escribir los tamaños
            outData.writeUInt8(iv.length, offset++);
            outData.writeUInt8(key.length, offset++);
            outData.writeUInt8(authTag.length, offset++);

            // Escribir la clave
            key.copy(outData, offset);
            offset += key.length;

            // Escribir el IV
            iv.copy(outData, offset);
            offset += iv.length;

            // Escribir el tag de autenticación
            authTag.copy(outData, offset);
            offset += authTag.length;

            // Escribir los datos cifrados
            encrypted.copy(outData, offset);

            return outData;
        } catch (error) {
            return null;
        }
    }

    // #endregion

    // #region Descifrar cadenas de caracteres

    /**
     * Descifra datos binarios y retorna una cadena
     * @param {Buffer} data - Datos cifrados
     * @returns {string} - Cadena descifrada
     */
    private decryptString(data: Buffer) {
        try {
            // Verificar que el dato no es nulo ni vacío
            if (!data || data.length === 0) {
                return '';
            }

            // Clonar los datos
            const cryptoData = Buffer.from(data);
            const rawData = this.decryptBinaryData(cryptoData);

            // Convertir bytes a string (usando UTF-8)
            return rawData ? rawData.toString('utf8') : '';
        } catch (error) {
            return '';
        }
    }

    /**
     * Descifra datos binarios usando AES-256-GCM
     * @param {Buffer} data - Datos cifrados con metadatos
     * @returns {Buffer} - Datos descifrados
     */
    private decryptBinaryData(data: Buffer) {
        try {
            let offset = 0;

            // Recuperar los tamaños
            const ivSize = data.readUInt8(offset++);
            const keySize = data.readUInt8(offset++);
            const tagSize = data.readUInt8(offset++);

            // Recuperar la clave
            const key = Buffer.alloc(keySize);
            data.copy(key, 0, offset, offset + keySize);
            offset += keySize;

            // Recuperar el IV
            const iv = Buffer.alloc(ivSize);
            data.copy(iv, 0, offset, offset + ivSize);
            offset += ivSize;

            // Recuperar el tag de autenticación
            const authTag = Buffer.alloc(tagSize);
            data.copy(authTag, 0, offset, offset + tagSize);
            offset += tagSize;

            // Obtener los datos cifrados
            const encryptedData = data.slice(offset);

            // Crear el descifrador AES-256-GCM
            const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
            decipher.setAuthTag(authTag);
            decipher.setAAD(Buffer.alloc(0)); // AAD vacío, igual que en el cifrado

            // Descifrar los datos
            let decrypted = decipher.update(encryptedData);
            decipher.final(); // Esto verificará la autenticidad

            return decrypted;
        } catch (error) {
            // Error de autenticación o descifrado
            return null;
        }
    }

    // #endregion
}

export default CryptoLib;
