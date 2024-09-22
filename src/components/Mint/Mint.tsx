import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './Mint.css';

interface MintProps {
    uploadToPinata: (file: File, name: string, description: string) => Promise<string>;
    mintNFT: (name: string, price: string, symbol: string, description: string, uri: string) => void;
}

// Define a custom type for the file with a preview property
interface FileWithPreview extends File {
    preview: string;
}

const Mint: React.FC<MintProps> = ({ uploadToPinata, mintNFT }) => {
    const [file, setFile] = useState<FileWithPreview | null>(null);
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [isMinting, setIsMinting] = useState(false);

    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: (acceptedFiles) => {
            const previewFile = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            }) as FileWithPreview; // Cast to FileWithPreview
            setFile(previewFile);
        },
    });

    const clearImage = () => {
        setFile(null);
    };

    const handleMint = async () => {
        if ( !file || !name || !description || !price) {
            alert('Please complete all fields');
            return;
        }

        setIsMinting(true);

        try {
            const IpfsHash = await uploadToPinata(file, name, description);
            mintNFT(name, price, symbol, description, IpfsHash);
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
                        <img src={file.preview} alt="Preview" className="preview-image" />
                    </div>
                ) : (
                    <p>Drag & drop an image file, or click to select one</p>
                )}
            </div>
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
                <label>Symbol:</label>
                <input 
                    type="text" 
                    value={symbol} 
                    onChange={(e) => setSymbol(e.target.value)} 
                    placeholder="Enter NFT Symbol" 
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
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
            </div>

            <button onClick={handleMint} disabled={isMinting} className='mint-button'>
                {isMinting ? 'Minting...' : 'Mint NFT'}
            </button>
        </div>
    );
};

export default Mint;
