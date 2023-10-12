import React from 'react';
import { Dialog, Backdrop, Link, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Document, Page, pdfjs } from 'react-pdf'; // For displaying PDF files

export function ViewResumeModal({ openResume, handleCloseResume, Fade }) {
	// Files to configure react-pdf to display the PDF resume.
	pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

	return (
		<Dialog
			maxWidth="50px"
			open={openResume}
			onClose={handleCloseResume}
			closeAfterTransition
			slots={{
				backdrop: Backdrop,
			}}
			slotProps={{
				backdrop: {
					TransitionComponent: Fade,
				},
			}}
		>
			<Fade in={openResume}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						height: '100%',
						backgroundColor: '#00254B',
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Link component="button">
							<CloseIcon
								sx={{
									fontSize: '2em',
									color: 'white',
									mt: 1,
									mr: 2,
									mb: 0,
								}}
								onClick={handleCloseResume}
							/>
						</Link>
					</Box>
					<Box>
						{/* Using react-pdf to display the PDF */}
						<a href="assets/henry-kim-resume.pdf">
							<Document file="assets/henry-kim-resume.pdf">
								<Page
									className="pdf-page"
									pageNumber={1}
									renderTextLayer={false}
									renderAnnotationLayer={false}
								/>
							</Document>
						</a>
					</Box>
				</Box>
			</Fade>
		</Dialog>
	);
}
