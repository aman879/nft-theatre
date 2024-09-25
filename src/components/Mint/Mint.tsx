import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Mint.css';

interface MintProps {
    uploadToPinata: (file: File, name: string, description: string, price: string) => Promise<string>;
    mintNFT: (uri: string, price: string) => void;
}

interface FileWithPreview extends File {
    preview: string;
}

const Mint: React.FC<MintProps> = ({ uploadToPinata, mintNFT }) => {
    const [file, setFile] = useState<FileWithPreview | null>(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isMinting, setIsMinting] = useState(false);

    const { getRootProps, getInputProps, fileRejections } = useDropzone({
        accept: {'video/*': [] },
        maxSize: 2000000, 
        onDrop: (acceptedFiles) => {
            const previewFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            }) as FileWithPreview;
            setFile(previewFile);
        },
    });

    const clearImage = () => {
        setFile(null);
    };

    const handleMint = async () => {
        if (!file || !name || !description || !price) {
            alert('Please complete all fields');
            return;
        }

        setIsMinting(true);

        try {
            const IpfsHash = await uploadToPinata(file, name, description, price);
            // const IpfsHash = `bafkreifw25xdtob666hxqytrgmkffqajdhgann5rfw75le6a57djsrso24`
            await mintNFT(IpfsHash, price);
            clearImage();
        } catch (e) {
            console.log(e);
        } finally {
            setIsMinting(false);
        }
    };

    return (
        <div className="mint-container">
            <h2>Mint Your NFT</h2>
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                {file ? (
                    <div>

                        <video src={file.preview} controls className="preview-video" />

                    </div>
                ) : (
                    <p>Drag & drop video file (max 2 MB), or click to select one</p>
                )}
            </div>
            {fileRejections.length > 0 && (
                <p className="error-message">File size exceeds 2 MB. Please upload a smaller file.</p>
            )}
            {file && (
                <button 
                    className='mint-button'
                    onClick={clearImage} 
                >
                    Clear
                </button>
            )}

            <div className="form-field">
                <label>Name:</label>
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter NFT Name" 
                />
            </div>

            <div className="form-field">
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter NFT Description"
                />
            </div>

            <div className="form-field">
                <label>Price (in ETH):</label>
                <input
                    id="price"
                    type="number"
                    required
                    min="0"
                    step="any"
                    inputMode="decimal"
                    placeholder="0.00"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <button onClick={handleMint} disabled={isMinting} className='mint-button'>
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </button>
        </div>
    );
};

export default Mint;
