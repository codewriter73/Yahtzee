import { derivatives, displayScores } from '@/lib/yahtzee/constants';
import {
  YahtzeeScorecard,
  YahtzeeScorecardValidated,
} from '@/lib/yahtzee/types';
import {
  Center, Stack, Table, Title,
} from '@mantine/core';

interface ScorecardProps {
  scorecard: YahtzeeScorecard;
  scorecardValidated: YahtzeeScorecardValidated;
  handleScore: (_type: string) => void;
}

function Scorecard({
  scorecard,
  scorecardValidated,
  handleScore,
}: ScorecardProps) {
  const rows = Object.keys(scorecard).map((key) => {
    const score = scorecard[key as keyof YahtzeeScorecard];
    const scoreValidated = scorecardValidated[key as keyof YahtzeeScorecardValidated];
    return (
      <tr
        key={key}
        style={{
          backgroundColor: scoreValidated && !score ? 'rgba(0, 256, 0, 0.4)' : 'inherit',
          cursor: score === null ? 'pointer' : 'default',
        }}
        onClick={() => handleScore(key)}
      >
        <td style={{
          fontWeight: derivatives.includes(key) ? 'bold' : 'normal',
        }}>{displayScores[key]}</td>
        <td>{score != null ? score : ''}</td>
      </tr>
    );
  });

  return (
    <Stack>
      <Center>
        <Title>Scorecard</Title>
      </Center>
      <Stack>
        <Table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Stack>
    </Stack>
  );
}

export default Scorecard;
