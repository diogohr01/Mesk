import React from 'react';
import { FileUpload } from '../../Data';

/**
 * Componente FileUploadInput - Input para upload de arquivos
 * @param {Object} props - Propriedades do componente
 * @param {Array} props.value - Arquivos carregados
 * @param {function} props.onChange - Função chamada quando os arquivos mudam
 * @param {string} props.inputType - Tipo de input ('images' | 'files')
 * @param {boolean} props.disabled - Se o input está desabilitado
 * @param {Object} props.style - Estilos customizados
 * @param {string} props.className - Classe CSS customizada
 */
const FileUploadInput = ({
    value = [],
    onChange,
    inputType = 'files',
    disabled = false,
    style,
    className,
    ...props
}) => {
    const handleFileUpload = (uploadedFiles) => {
        if (onChange) {
            onChange(uploadedFiles);
        }
    };

    const fileProps = {
        onFileUpload: handleFileUpload,
        inputType,
        disabled,
        style,
        className,
        ...props
    };

    // Props específicas por tipo
    if (inputType === 'images') {
        fileProps.preUploadedFiles = value;
    } else {
        fileProps.preFilesIds = value;
    }

    return <FileUpload {...fileProps} />;
};

export default FileUploadInput;
