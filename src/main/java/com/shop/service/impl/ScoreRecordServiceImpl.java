package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shop.entity.ScoreRecord;
import com.shop.mapper.ScoreRecordMapper;
import com.shop.service.ScoreRecordService;

@Service
public class ScoreRecordServiceImpl implements ScoreRecordService{

	@Autowired
	private ScoreRecordMapper scoreRecordMapper;
	
	@Override
	public List<ScoreRecord> listScoreRecord() {
		return scoreRecordMapper.listScoreRecord();
	}
	
	@Override
	public Integer insertScoreRecord(ScoreRecord scoreRecord) {
		
		Integer result = scoreRecordMapper.insertScoreRecord(scoreRecord);
		return result;
	}
	
	@Override
	public Integer deleteScoreRecord(Long id) {
		
		Integer result = scoreRecordMapper.deleteScoreRecord(id);
		return result;
	}

	@Override
	public List<ScoreRecord> getScoreRecordByName(String userName) {
		List<ScoreRecord> scoreRecords = scoreRecordMapper.getScoreRecordByName(userName);
		return scoreRecords;
	}

	@Override
	public Integer updateScoreRecord(ScoreRecord scoreRecord) {
		Integer result = scoreRecordMapper.updateScoreRecord(scoreRecord);
		return result;
	}

}
