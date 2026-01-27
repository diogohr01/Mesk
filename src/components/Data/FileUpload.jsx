import { DeleteOutlined, FileOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, message, Modal, Row } from "antd";
import { Card } from '../Layout';
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillEye } from "react-icons/ai";
import Api from "../../services/api";
import { LoadingSpinner } from '../UI';

const DropzoneComponent = ({ onFileUpload, preFilesIds = [], inputType = "images" }) => {
    const [loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // Lista de arquivos que foram enviados ou carregados via ID

    const [previewVisible, setPreviewVisible] = useState(false); // Controle do modal de preview
    const [currentPreview, setCurrentPreview] = useState(null); // Objeto atual para o preview
    
    // Refs para rastrear quais IDs já foram buscados e evitar requisições duplicadas
    const fetchedIdsRef = useRef(new Set());
    const lastPreFilesIdsRef = useRef('');

    // Função para buscar arquivos por IDs, evitando re-buscas de arquivos existentes
    const fetchFilesByIds = useCallback(async (fileIdsInput) => {
        const fileIds = Array.isArray(fileIdsInput) ? fileIdsInput : [fileIdsInput];
        const uniqueFileIds = Array.from(new Set(fileIds));

        // Verifica quais IDs ainda não foram buscados
        const idsToFetch = uniqueFileIds.filter((id) => !fetchedIdsRef.current.has(id));

        if (idsToFetch.length === 0) {
            return; // Nenhum novo arquivo para buscar
        }

        // Marca os IDs como sendo buscados antes de fazer a requisição
        idsToFetch.forEach(id => fetchedIdsRef.current.add(id));

        setLoading(true);
        try {
            const responses = await Promise.all(
                idsToFetch.map((id) => Api.get(`/crud/getFile/${id}`, { responseType: 'blob' }))
            );

            const filesFromServer = responses.map((response, index) => {
                const blob = response.data;
                const url = URL.createObjectURL(blob);

                return {
                    id: idsToFetch[index],
                    name: `${idsToFetch[index]}`,
                    type: blob.type,
                    preview: url,
                    uploaded: true,
                    lastModified: Date.now(),
                };
            });

            setUploadedFiles((prevFiles) => {
                const allFiles = [...prevFiles, ...filesFromServer];
                const uniqueFiles = Array.from(new Map(allFiles.map(file => [file.id, file])).values());
                return uniqueFiles;
            });
        } catch (error) {
            // Em caso de erro, remove os IDs do set para permitir nova tentativa
            idsToFetch.forEach(id => fetchedIdsRef.current.delete(id));
            message.error("Erro ao carregar arquivos.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Revoga URLs criadas com createObjectURL quando o componente é desmontado
    useEffect(() => {
        return () => {
            uploadedFiles.forEach((file) => {
                if (file.preview) {
                    URL.revokeObjectURL(file.preview);
                }
            });
        };
    }, [uploadedFiles]);

    // useEffect para carregar preFilesIds quando o componente é montado ou atualizado
    useEffect(() => {
        if (preFilesIds && preFilesIds.length > 0) {
            // Converte para string para comparação estável
            const idsString = JSON.stringify([...preFilesIds].sort());
            
            // Só busca se os IDs realmente mudaram
            if (idsString !== lastPreFilesIdsRef.current) {
                lastPreFilesIdsRef.current = idsString;
                fetchFilesByIds(preFilesIds);
            }
        }
    }, [preFilesIds, fetchFilesByIds]);

    // Função para fazer upload de um novo arquivo
    const uploadFile = useCallback(async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("files", file);

        try {
            const response = await Api.post("/crud/uploadFile", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                let newFileId = response.data.data || response.data.response;

                if (Array.isArray(newFileId)) {
                    newFileId = newFileId[0];
                }

                const preview = {
                    id: newFileId,
                    name: newFileId, // Usar o nome real do arquivo
                    preview: URL.createObjectURL(file),
                    uploaded: true,
                    type: file.type,
                };

                setUploadedFiles((prevFiles) => {
                    const allFiles = [...prevFiles, preview];
                    const uniqueFiles = Array.from(new Map(allFiles.map((file) => [file.id, file])).values());

                    const distinctFileNames = Array.from(new Set(uniqueFiles.map((file) => file.name)));
                    console.log(distinctFileNames);

                    if (onFileUpload) {
                        onFileUpload(distinctFileNames);
                    }

                    return uniqueFiles;
                });

                message.success("Arquivo enviado com sucesso!");
            } else {
                message.error("Erro ao enviar o arquivo.");
            }
        } catch (error) {
            console.error('Upload error:', error);
            message.error("Erro ao enviar o arquivo.");
        } finally {
            setLoading(false);
        }
    }, [onFileUpload]);

    // Função chamada quando um arquivo é solto ou selecionado na dropzone
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]; // Aceitar apenas um arquivo por vez
            uploadFile(file);
        }
    }, [uploadFile]);

    // Hook useDropzone para lidar com arquivos soltos ou selecionados na área de drop
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: false,
        accept:
            inputType === "images"
                ? "image/*"
                : "application/pdf, .doc, .docx, .xls, .xlsx",
    });

    // Função para remover um arquivo
    const handleRemoveFile = useCallback(async (fileId) => {
        setLoading(true);
        try {
            await Api.post(`/crud/removeFile/${fileId}`);
            
            // Remove o arquivo usando a forma funcional do setState
            setUploadedFiles((prevFiles) => {
                const fileToRemove = prevFiles.find(f => f.id === fileId);
                if (fileToRemove && fileToRemove.preview) {
                    URL.revokeObjectURL(fileToRemove.preview);
                }
                // Remove o ID do ref também
                fetchedIdsRef.current.delete(fileId);
                return prevFiles.filter((file) => file.id !== fileId);
            });

            if (onFileUpload) {
                onFileUpload({ removedFileId: fileId });
            }

            message.success("Arquivo removido com sucesso!");
        } catch (error) {
            message.error("Erro ao remover o arquivo.");
        } finally {
            setLoading(false);
        }
    }, [onFileUpload]);

    // Função para lidar com a visualização do preview
    const handlePreview = (file) => {
        setCurrentPreview(file);
        setPreviewVisible(true);
    };

    return (
        <div>
            {/* Dropzone com estilo moderno */}
            <Card
                {...getRootProps()}
                style={{
                    border: isDragActive ? "2px dashed #1890ff" : "2px dashed #d9d9d9",
                    padding: "40px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: isDragActive ? "#f6ffed" : "#fafafa",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    boxShadow: isDragActive ? "0 4px 12px rgba(24, 144, 255, 0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
                }}
                styles={{ body: { padding: 0 } }}
            >
                <input {...getInputProps()} />
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: isDragActive ? '#1890ff' : '#8c8c8c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                    }}>
                        <UploadOutlined style={{ 
                            fontSize: "28px", 
                            color: 'white'
                        }} />
                    </div>
                    <div>
                        <p style={{ 
                            margin: 0, 
                            fontSize: '16px', 
                            fontWeight: '500',
                            color: isDragActive ? '#1890ff' : '#262626'
                        }}>
                    {isDragActive ? "Solte o arquivo aqui..." : "Arraste e solte um arquivo ou clique aqui"}
                </p>
                        <p style={{ 
                            margin: '8px 0 0 0', 
                            fontSize: '14px', 
                            color: '#8c8c8c'
                        }}>
                            {inputType === "images" ? "Suporta apenas imagens (JPG, PNG, GIF)" : "Suporta todos os tipos de arquivo"}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Loading spinner */}
            {loading && (
                <div style={{ textAlign: 'center', margin: '16px 0' }}>
                    <LoadingSpinner />
                </div>
            )}

            {/* Lista de arquivos com design compacto */}
            {uploadedFiles.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                    {/* Grid compacto */}
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
                        gap: '12px' 
                    }}>
                    {uploadedFiles.map((file) => (
                            <div
                            key={file.id}
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                    border: '1px solid #e5e7eb',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-1px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                                }}
                            >
                                {file.type.includes("image") ? (
                                    <div style={{ position: 'relative' }}>
                                        <img
                                            src={file.preview}
                                            alt={file.name}
                                            style={{
                                                width: "100%",
                                                height: "120px",
                                                objectFit: "cover",
                                                cursor: "pointer"
                                            }}
                                            onClick={() => handlePreview(file)}
                                        />
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            right: '8px',
                                            background: 'rgba(0,0,0,0.75)',
                                            color: 'white',
                                            padding: '2px 6px',
                                            borderRadius: '4px',
                                            fontSize: '10px',
                                            fontWeight: '600',
                                            textTransform: 'uppercase'
                                        }}>
                                            IMG
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            top: '8px',
                                            left: '8px',
                                            background: 'rgba(255,255,255,0.95)',
                                            borderRadius: '50%',
                                            width: '28px',
                                            height: '28px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreview(file);
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#1890ff';
                                            e.currentTarget.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.95)';
                                            e.currentTarget.style.color = '#1890ff';
                                        }}
                                        >
                                            <AiFillEye style={{ fontSize: '12px', color: '#1890ff' }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{
                                        padding: '16px',
                                        textAlign: 'center',
                                        backgroundColor: '#f8fafc'
                                    }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '8px',
                                            backgroundColor: '#dbeafe',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 12px auto'
                                        }}>
                                            <FileOutlined style={{ 
                                                fontSize: '20px', 
                                                color: '#3b82f6'
                                            }} />
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#475569',
                                            fontWeight: '500',
                                            wordBreak: 'break-word',
                                            lineHeight: '1.3'
                                        }}>
                                            {file.name}
                                        </div>
                                    </div>
                                )}
                                
                                {/* Footer compacto */}
                                <div style={{ 
                                    padding: '8px 12px',
                                    borderTop: '1px solid #f1f5f9',
                                    backgroundColor: '#f8fafc'
                                }}>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'space-between', 
                                        alignItems: 'center' 
                                    }}>
                                        <div style={{ 
                                            fontSize: '11px', 
                                            color: '#64748b',
                                            fontWeight: '500'
                                        }}>
                                            {file.type.includes("image") ? "Imagem" : "Arquivo"}
                                        </div>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <Button
                                                type="text"
                                                size="small"
                                                icon={<AiFillEye />}
                                                onClick={() => handlePreview(file)}
                                                style={{ 
                                                    color: '#3b82f6',
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    padding: '2px 6px',
                                                    height: 'auto',
                                                    fontSize: '11px'
                                                }}
                                            >
                                                Ver
                                            </Button>
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => handleRemoveFile(file.id)}
                                                style={{ 
                                                    border: 'none',
                                                    boxShadow: 'none',
                                                    padding: '2px 6px',
                                                    height: 'auto',
                                                    fontSize: '11px'
                                                }}
                                            >
                                                Remover
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
            )}

            {/* Modal para visualização do preview */}
            <Modal
                open={previewVisible}
                onCancel={() => setPreviewVisible(false)}
                centered
                width={900}
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <AiFillEye style={{ color: '#1890ff' }} />
                        <span>Visualizar Arquivo</span>
                    </div>
                }
                footer={[
                    <Button key="cancel" onClick={() => setPreviewVisible(false)}>
                        Fechar
                    </Button>
                ]}
                style={{ top: 20 }}
            >
                {currentPreview && currentPreview.type.startsWith("image") ? (
                    <div style={{ textAlign: 'center' }}>
                    <img
                        alt="Preview"
                            style={{ 
                                width: "100%", 
                                maxHeight: "70vh",
                                objectFit: "contain",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                            }}
                        src={currentPreview.preview}
                    />
                        <div style={{ 
                            marginTop: '16px', 
                            padding: '12px', 
                            backgroundColor: '#f5f5f5', 
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#666'
                        }}>
                            <strong>Nome:</strong> {currentPreview.name}
                        </div>
                    </div>
                ) : (
                    currentPreview && (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <FileOutlined style={{ fontSize: '64px', color: '#8c8c8c', marginBottom: '16px' }} />
                            <h3 style={{ marginBottom: '16px' }}>{currentPreview.name}</h3>
                            <Button 
                                type="primary" 
                                size="large"
                                onClick={() => window.open(currentPreview.preview, '_blank')}
                            >
                                Abrir Arquivo
                            </Button>
                        </div>
                    )
                )}
            </Modal>
        </div>
    );
};

export default DropzoneComponent;
