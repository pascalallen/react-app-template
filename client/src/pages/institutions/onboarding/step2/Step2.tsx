import _ from 'lodash';
import classnames from 'classnames';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import StepsContainer from '../common/Steps/StepsContainer';
import StepBar from '../common/Steps/StepBar';
import NavigateBack from '../common/NavigateBack/NavigateBack';
import InfoIconImg from '@/assets/images/icon_info.png';
import FileIconImg from '@/assets/images/icon_file.png';

const validateFile = (file: File): boolean => {
  const fileName = file.name.trim().toLowerCase();
  const ext = fileName.split('.').pop();
  // * file size is expressed in bytes, 10MB = 10000000 bytes
  return file.size < 10000000 && ext === 'csv';
};

type Props = {
  onOnboardingFileUpload: (file: File | null) => Promise<void>;
};

const initialState: {
  files: File[];
  isValidFile: boolean;
  file: File | null;
} = {
  files: [],
  file: null,
  isValidFile: false
};

const Step2 = (props: Props) => {
  const { onOnboardingFileUpload } = props;

  const [file, setFile] = useState(initialState.file);
  const [isValidFile, setIsValidFile] = useState(initialState.isValidFile);

  const onDrop = useCallback((inputFiles: File[]) => {
    const inputFile = inputFiles[0];
    if (!_.isNil(inputFile)) {
      setFile(inputFile);
      setIsValidFile(validateFile(inputFile));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClearFile = () => {
    setFile(initialState.file);
    setIsValidFile(initialState.isValidFile);
  };

  const renderDragAndDrop = () => {
    const dndRootProps = getRootProps({
      className:
        'dnd-dropzone-container d-flex align-items-center align-self-center justify-content-center rounded-circle'
    });
    const dndInputProps = getInputProps();
    return (
      <div className="dnd-container d-flex flex-column align-items-center justify-content-center">
        <div {...dndRootProps}>
          <input id="dnd-file-input" {...dndInputProps} />
          <p className="dnd-text text-center">
            Drag and Drop or <span className="btn btn-link dnd-link p-0">Choose CSV file</span>
          </p>
        </div>
      </div>
    );
  };

  const renderFileInfo = () => {
    const fileName = file?.name ? file.name : 'Unknown file';
    const fileSizeInKB = file?.size ? file.size / 1000 : 0;
    return (
      <div className="dnd-container d-flex flex-column align-items-center justify-content-center">
        <div className="dnd-file-container d-flex flex-column align-items-center align-self-center justify-content-center rounded-circle">
          <img src={FileIconImg} className="img-fluid dnd-file-icon" alt="File Information" />
          <span className="dnd-file-text">{fileName}</span>
          <span className="dnd-file-size">{fileSizeInKB} KB</span>
          <button
            id="file-remove-btn"
            className="btn btn-link dnd-file-remove-btn p-0 font-size-sm"
            onClick={handleClearFile}>
            Remove
          </button>
        </div>
      </div>
    );
  };

  const renderFileError = () => {
    return (
      <div className="dnd-container d-flex flex-column align-items-center justify-content-center">
        <div className="dnd-file-error-container d-flex flex-column align-items-center align-self-center justify-content-center rounded-lg">
          <img src={InfoIconImg} className="img-fluid dnd-file-error-icon" alt="File Error" />
          <p id="step-2-dnd-file-error-msg" className="dnd-file-error-msg font-size-sm text-center">
            That file isn’t the right format. Please upload a csv file under 10 MB.
          </p>
          <button className="btn btn-primary dnd-file-error-btn w-100" onClick={handleClearFile}>
            <span className="dnd-file-error-btn-text font-size-sm">Okay</span>
          </button>
        </div>
      </div>
    );
  };

  const shouldRenderDnd = _.isNil(file);
  const shouldRenderFileInfo = !_.isNil(file) && isValidFile;
  const shouldRenderError = !_.isNil(file) && !isValidFile;
  const disableUploadBtn = _.isNil(file) || !isValidFile;
  return (
    <div id="step-2-container" className="step-2-container">
      <NavigateBack />
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h3 className="heading-title">Welcome to Faculty</h3>
          <StepsContainer>
            <StepBar active checked text="Step 1 - Download Template" />
            <StepBar active checked={false} text="Step 2 - Upload Students" />
          </StepsContainer>
          <h4 className="body-title text-center">Finally, upload your students</h4>
          <p className="body-text text-center p-0">
            If your CVS file is complete, drag and drop it or upload it here. Then you are all set to begin managing
            your students.
          </p>
          {shouldRenderDnd ? renderDragAndDrop() : null}
          {shouldRenderFileInfo && isValidFile ? renderFileInfo() : null}
          {shouldRenderError ? renderFileError() : null}
          {!shouldRenderError ? (
            <div className="action-buttons-container d-flex align-items-center justify-content-center">
              <button
                id="step-2-upload-file"
                className={classnames(
                  'btn btn-primary action-button',
                  disableUploadBtn ? 'btn-disabled cursor-not-allowed' : ''
                )}
                disabled={disableUploadBtn}
                onClick={() => onOnboardingFileUpload(file)}>
                <div className="action-button-text overflow-hidden text-nowrap w-100">Upload File</div>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Step2;
