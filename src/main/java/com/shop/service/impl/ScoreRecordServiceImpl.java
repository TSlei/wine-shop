package com.shop.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.shop.entity.ScoreRecord;
import com.shop.entity.request.RequestParam;
import com.shop.mapper.ScoreRecordMapper;
import com.shop.service.ScoreRecordService;

@Service
public class ScoreRecordServiceImpl implements ScoreRecordService{

	@Autowired
	private ScoreRecordMapper scoreRecordMapper;
	
	@Override
	public PageInfo<ScoreRecord> listScoreRecord(RequestParam request) {
		int pageSize = request.getPageSize();;
		int currentPageNum = request.getPageNum();
		PageHelper.startPage(currentPageNum, pageSize, true);
		List<ScoreRecord> scoreRecords = scoreRecordMapper.listScoreRecord(request);
		return new PageInfo<ScoreRecord>(scoreRecords);
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
	public PageInfo<ScoreRecord> getScoreRecordByName(RequestParam request) {
		int pageSize = request.getPageSize();;
		int currentPageNum = request.getPageNum();
		PageHelper.startPage(currentPageNum, pageSize, true);
		List<ScoreRecord> scoreRecords = scoreRecordMapper.getScoreRecordByName(request);
		return new PageInfo<ScoreRecord>(scoreRecords);
	}

	@Override
	public Integer updateScoreRecord(ScoreRecord scoreRecord) {
		Integer result = scoreRecordMapper.updateScoreRecord(scoreRecord);
		return result;
	}

}
