import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

const AttachmentList = ({ files = [], onDelete }) => {
    if (!files.length) return null;

    return (
        <div className="mt-6 border-t border-gray-300 pt-4 w-full max-w-2xl mx-auto">
            <h4 className="text-[20px] font-bold mb-3 ml-4 text-gray-800 text-left"> 첨부 파일</h4>
            <ul className="space-y-2">
                {files.map((file, index) => (
                    <li
                        key={index}
                        className="flex items-center justify-between bg-gray-50 px-5 py-1 rounded-md shadow-sm hover:bg-gray-100 transition"
                    >

                        <span
                            className="text-gray-700 text-[18px] truncate max-w-[65%]"
                            title={file.original_name}
                        >
                          {file.original_name}
                        </span>

                        <div className="flex items-center gap-x-2 shrink-0">
                            <a
                                href={`${import.meta.env.VITE_API_URL}${file.url}`}
                                target="_blank"
                                rel="noreferrer"
                                download={file.filename}
                                title="다운로드"
                                className="text-blue-400 hover:text-blue-700 transition"
                            >
                                <DownloadIcon fontSize="small" />
                            </a>

                            {onDelete && (
                                <button
                                    type="button"
                                    onClick={() => onDelete(file)}
                                    className="text-gray-500 hover:text-red-500 transition"
                                    title="삭제"
                                >
                                    <DeleteIcon fontSize="small" />
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttachmentList;
