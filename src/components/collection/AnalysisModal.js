import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Modal = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #202124;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const TableSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

  th, td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid #f1f3f4;
  }

  th {
    background: #f8f9fa;
    color: #202124;
    font-weight: 500;
  }

  td {
    color: #5f6368;
  }
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const ChartContainer = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

const ChartTitle = styled.h4`
  font-size: 16px;
  color: #202124;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: ${props => props.variant === 'outlined' ? 'white' : '#f8f9fa'};
  color: ${props => props.variant === 'outlined' ? '#0969da' : '#24292f'};
  border: 1px solid ${props => props.variant === 'outlined' ? '#cae1ff' : '#d0d7de'};
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${props => props.variant === 'outlined' ? '#e1f0ff' : '#f3f4f6'};
    border-color: ${props => props.variant === 'outlined' ? '#a7d0ff' : '#bbc0c4'};
  }

  .material-icons {
    font-size: 18px;
  }
`;

const AnalysisModal = ({ isOpen, onClose, data }) => {
  const scatterData1 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

  const scatterData2 = [
    { x: 200, y: 260, z: 240 },
    { x: 180, y: 290, z: 220 },
    { x: 160, y: 400, z: 180 },
    { x: 140, y: 500, z: 280 },
    { x: 200, y: 390, z: 300 },
    { x: 220, y: 290, z: 340 },
  ];

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'analysis_result.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <Header>
              <Title>Analysis Result</Title>
            </Header>
            <Content>
              <TableSection>
                <Table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Total Time</td>
                      <td>2.5h</td>
                    </tr>
                    <tr>
                      <td>Average Duration</td>
                      <td>15min</td>
                    </tr>
                  </tbody>
                </Table>
                <Table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>User 1</td>
                      <td>85%</td>
                    </tr>
                    <tr>
                      <td>User 2</td>
                      <td>92%</td>
                    </tr>
                  </tbody>
                </Table>
              </TableSection>
              <ChartSection>
                <ChartContainer>
                  <ChartTitle>Left Eye Movement</ChartTitle>
                  <ScatterChart
                    width={400}
                    height={300}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="X" unit="px" />
                    <YAxis type="number" dataKey="y" name="Y" unit="px" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Points" data={scatterData1} fill="#1a73e8" />
                  </ScatterChart>
                </ChartContainer>
                <ChartContainer>
                  <ChartTitle>Right Eye Movement</ChartTitle>
                  <ScatterChart
                    width={400}
                    height={300}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="X" unit="px" />
                    <YAxis type="number" dataKey="y" name="Y" unit="px" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Points" data={scatterData2} fill="#34A853" />
                  </ScatterChart>
                </ChartContainer>
              </ChartSection>
              <ButtonGroup>
                <Button onClick={onClose} variant="outlined">
                  Close
                </Button>
                <Button onClick={handleExportJSON} variant="outlined">
                  <span className="material-icons">download</span>
                  Export JSON
                </Button>
              </ButtonGroup>
            </Content>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AnalysisModal; 